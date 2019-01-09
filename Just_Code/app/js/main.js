$(function() {
	function slick() {
		$('.slick').slick({
			arrows: true,
			prevArrow:"<button type='button' class='slick-prev'></button>",
            nextArrow:"<button type='button' class='slick-next'></button>"
		});
	}

	function burgerMenu() {
		var menu = $('.burger-menu'),
		nav = $('.nav');

		menu.on('click', function(e) {
			e.preventDefault();

			$(this).toggleClass('active');
			nav.toggleClass('active');
			$('body').toggleClass('nav-active');
		});
	}

	function validationForm() {
		var form = $('.form'),
		mail = form.find('input:not([type="submit"])'), 
		submit = form.find('.btn-submit'); 

		submit.on('click', function(e) {
			e.preventDefault(); 

			if (mail.val().length > 0) {
				mail.css('border','1px solid green');
				form.submit();
			} else {
				mail.css('border','1px solid red');
				return;
			}
		});
	}
	
	function init() {
		burgerMenu();
		slick();
		validationForm();
	}

	init();

});