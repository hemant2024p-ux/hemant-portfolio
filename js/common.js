// ============================================
// DROPDOWN
// ============================================
$('.dropdown-menu').click(function (e) {
	e.stopPropagation();
});
$(".drp-arrow").click(function () {
	$(this).parent().toggleClass("show-drop");
});

// ============================================
// SCROLL TO TOP
// ============================================
$(window).scroll(function () {
	if ($(this).scrollTop() >= 50) {
		$('.scroll-to-top').addClass("in");
	} else {
		$('.scroll-to-top').removeClass("in");
	}
});
$('.scroll-to-top').click(function () {
	$('body,html').animate({ scrollTop: 0 }, 500);
});

// ============================================
// MENU FIX (Sticky Header)
// ============================================
$(window).scroll(function (e) {
	if ($(this).scrollTop() >= $(".scroller_anchor").offset().top && $('.scroller_anchor').css('position') != 'fixed') {
		$('header').addClass('menu-fix').slideDown();
	} else if ($(this).scrollTop() < $(".scroller_anchor").offset().top && $('.scroller_anchor').css('position') != 'relative') {
		$('header').removeClass('menu-fix');
	}
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
$(window).scroll(function () {
	var scrollDistance = $(window).scrollTop();
	var windowHeight = $(window).height() / 3;

	$('section[id], .hero-section[id]').each(function () {
		var elementOffset = $(this).offset().top;
		if (elementOffset - windowHeight <= scrollDistance) {
			var id = $(this).attr('id');
			$('.navbar-nav .nav-item').removeClass('active');
			$('.navbar-nav .nav-item a[href="#' + id + '"]').parent().addClass('active');

			if ($(window).width() < 1200) {
				var offcanvas = document.querySelector('#main-menu');
				if (offcanvas && offcanvas.classList.contains('show')) {
					var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
					if (bsOffcanvas) bsOffcanvas.hide();
					$('#hamburger').removeClass('open');
				}
			}
		}
	});
});

// ============================================
// SMOOTH SCROLL
// ============================================
$(document).on('click', '.navbar-nav a.nav-link[href^="#"]', function (e) {
	e.preventDefault();
	var target = $(this.getAttribute('href'));
	if (target.length) {
		$('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
	}
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
(function typewriter() {
	var el = document.getElementById('typewriter');
	if (!el) return;
	var phrases = [
		'beautiful digital experiences',
		'intuitive user interfaces',
		'seamless user journeys',
		'pixel-perfect designs',
		'accessible web solutions'
	];
	var phraseIndex = 0;
	var charIndex = 0;
	var isDeleting = false;
	var speed = 80;

	function type() {
		var current = phrases[phraseIndex];
		if (isDeleting) {
			el.textContent = current.substring(0, charIndex - 1);
			charIndex--;
			speed = 40;
		} else {
			el.textContent = current.substring(0, charIndex + 1);
			charIndex++;
			speed = 80;
		}

		if (!isDeleting && charIndex === current.length) {
			speed = 2000;
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			phraseIndex = (phraseIndex + 1) % phrases.length;
			speed = 500;
		}
		setTimeout(type, speed);
	}
	type();
})();

// ============================================
// SKILL BAR ANIMATION
// ============================================
function animateSkillBars() {
	$('.skill-progress').each(function () {
		var $this = $(this);
		var percent = $this.closest('.skill-item').data('percent');
		if ($this.offset().top < $(window).scrollTop() + $(window).height() - 80 && !$this.hasClass('animated')) {
			$this.css('--percent', percent + '%');
			$this.addClass('animated');
		}
	});
}

$(window).on('scroll', animateSkillBars);
$(window).on('load', function () {
	setTimeout(animateSkillBars, 400);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
	$('.stat-number[data-count]').each(function () {
		var $this = $(this);
		if ($this.offset().top < $(window).scrollTop() + $(window).height() - 80 && !$this.hasClass('counted')) {
			$this.addClass('counted');
			var target = parseInt($this.data('count'));
			var current = 0;
			var increment = Math.ceil(target / 40);
			var timer = setInterval(function () {
				current += increment;
				if (current >= target) {
					current = target;
					clearInterval(timer);
				}
				$this.text(current);
			}, 30);
		}
	});
}

$(window).on('scroll', animateCounters);
$(window).on('load', function () {
	setTimeout(animateCounters, 500);
});

// ============================================
// SCROLL REVEAL (data-aos)
// ============================================
function checkReveal() {
	var windowBottom = $(window).scrollTop() + $(window).height();

	$('[data-aos]').each(function () {
		var $this = $(this);
		var delay = parseInt($this.data('aos-delay')) || 0;

		if ($this.offset().top < windowBottom - 60) {
			if (delay) {
				setTimeout(function () {
					$this.addClass('aos-animate');
				}, delay);
			} else {
				$this.addClass('aos-animate');
			}
		}
	});
}

$(window).on('scroll', checkReveal);
$(window).on('load', function () {
	setTimeout(checkReveal, 200);
});

// ============================================
// CONTACT FORM
// ============================================
$('#contactForm').on('submit', function (e) {
	e.preventDefault();
	var $btn = $(this).find('button[type="submit"]');
	var originalText = $btn.html();
	$btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);

	setTimeout(function () {
		$btn.html('<i class="fas fa-check-circle"></i> Message Sent!');
		$btn.removeClass('btn-primary-custom').css('background', 'linear-gradient(135deg, #10b981, #059669)');

		setTimeout(function () {
			$btn.html(originalText).removeAttr('style').addClass('btn-primary-custom').prop('disabled', false);
			$('#contactForm')[0].reset();
		}, 3000);
	}, 1500);
});

// ============================================
// PARALLAX
// ============================================
$(window).on('scroll', function () {
	var scrollPos = $(this).scrollTop();
	$('.hero-shape').css({ 'transform': 'translateY(' + scrollPos * 0.08 + 'px) rotate(' + scrollPos * 0.1 + 'deg)' });
	$('.hero-orb--1').css({ 'transform': 'translate(' + scrollPos * 0.02 + 'px, ' + scrollPos * -0.03 + 'px)' });
	$('.hero-orb--2').css({ 'transform': 'translate(' + scrollPos * -0.02 + 'px, ' + scrollPos * 0.03 + 'px)' });
});

// ============================================
// CURSOR GLOW (Desktop only)
// ============================================
(function cursorGlow() {
	if ($(window).width() < 1024) return;
	var glow = $('<div class="cursor-glow"></div>');
	glow.css({
		position: 'fixed',
		width: '300px',
		height: '300px',
		borderRadius: '50%',
		background: 'radial-gradient(circle, rgba(0,87,163,0.03) 0%, transparent 70%)',
		pointerEvents: 'none',
		zIndex: 9999,
		transform: 'translate(-50%, -50%)',
		transition: 'left 0.3s ease, top 0.3s ease'
	});
	$('body').append(glow);
	$(document).on('mousemove', function (e) {
		glow.css({ left: e.clientX + 'px', top: e.clientY + 'px' });
	});
})();

// ============================================
// HEADER GLASS ON SCROLL
// ============================================
$(window).on('scroll', function () {
	var scroll = $(this).scrollTop();
	if (scroll > 100) {
		$('header').addClass('header-glass');
	} else {
		$('header').removeClass('header-glass');
	}
});
