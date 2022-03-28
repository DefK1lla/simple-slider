window.addEventListener('load', function () {

	let btnPrev = document.querySelector('.gallery .buttons .prev'),
		btnNext = document.querySelector('.gallery .buttons .next');

	let images = document.querySelectorAll('.gallery .photos img');
	let i = 0;
	let rate = 500;
	let isAnimated = false;


	let keyframesToRight = [
		{ opacity: 1, transform: 'translateX(0)' },
		{ opacity: 0, transform: 'translateX(100%)' },
	];
	let keyframesToLeft = [
		{ opacity: 1, transform: 'translateX(0)' },
		{ opacity: 0, transform: 'translateX(-100%)' },
	];

	btnPrev.addEventListener('click', function () {
		if (isAnimated) {
			return;
		}

		let slideHide = images[i];
		i = i > 0 ? --i : images.length - 1;

		toggleSlides(slideHide, images[i], true);
	});

	btnNext.addEventListener('click', function () {
		if (isAnimated) {
			return;
		}

		let slideHide = images[i];
		i = i < images.length - 1 ? ++i : 0;

		toggleSlides(slideHide, images[i]);
	});


	function toggleSlides(slideHide, slideShow, isPrev) {
		isAnimated = true;

		slideHide.classList.remove('showed');
		let animateHide = slideHide.animate(isPrev ? keyframesToRight : keyframesToLeft, { duration: rate });

		slideShow.classList.add('showed');
		let animateShow = slideShow.animate(isPrev ? keyframesToLeft : keyframesToRight, { duration: rate, direction: 'reverse' });

		animateShow.addEventListener('finish', function () {
			isAnimated = false;
		});
	}
});