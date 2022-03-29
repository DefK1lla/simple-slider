class Slider {
	keyframesToRight = [
		{ opacity: 1, transform: 'translateX(0)' },
		{ opacity: 0, transform: 'translateX(100%)' },
	];
	keyframesToLeft = [
		{ opacity: 1, transform: 'translateX(0)' },
		{ opacity: 0, transform: 'translateX(-100%)' },
	];

	index = 0;
	rate = 500;
	isAnimated = false;

	constructor(selector, params = { autoplay: false, interval: 2000, }) {
		this.gallery = document.querySelector(selector);
		this.images = this.gallery.querySelectorAll('.photos img');

		this.btnPrev = this.gallery.querySelector('.buttons .prev');
		this.btnNext = this.gallery.querySelector('.buttons .next');

		this.autoplay = params.autoplay;

		if (this.autoplay) {
			this.startAutoplay(params.interval);
		}

		this.btnNext.addEventListener('click', () => this.next());
		this.btnPrev.addEventListener('click', () => this.prev());
	}

	prev() {
		if (this.isAnimated) {
			return;
		}

		let slideHide = this.images[this.index];
		this.index = this.index > 0 ? --this.index : this.images.length - 1;

		this.toggleSlides(slideHide, this.images[this.index], true);
	}

	next() {
		if (this.isAnimated) {
			return;
		}

		let slideHide = this.images[this.index];
		this.index = this.index < this.images.length - 1 ? ++this.index : 0;

		this.toggleSlides(slideHide, this.images[this.index]);
	}

	toggleSlides(slideHide, slideShow, isPrev) {
		this.isAnimated = true;

		slideHide.classList.remove('showed');
		let animateHide = slideHide.animate(isPrev ? this.keyframesToRight : this.keyframesToLeft, { duration: this.rate });

		slideShow.classList.add('showed');
		let animateShow = slideShow.animate(isPrev ? this.keyframesToLeft : this.keyframesToRight, { duration: this.rate, direction: 'reverse' });

		animateShow.addEventListener('finish', () => this.isAnimated = false);
	}

	startAutoplay(interval) {
		this.autoplayInterval = setInterval(() => {
			this.next();
		}, interval);
	}

	stopAutoplay() {
		clearInterval(this.autoplayInterval);
	}
}
