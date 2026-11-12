$(document).ready(function () {
    $('.slick-slider').each(function () {
        let slider = $(this);

        let options = {
            prevArrow: slider.parent().find('.slider-prev'),
            nextArrow: slider.parent().find('.slider-next'),
            infinite: true,
            autoplay: true,
            dots: false
        };

        let extraOptions = {};

        if (slider.hasClass('advantages')) {
            extraOptions = {
                slidesToShow: 3.5,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                dots: true,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            };
        }

        if (slider.hasClass('sertificates')) {
            extraOptions = {
                slidesToShow: 4.2,
                slidesToScroll: 1,
                centerMode: false,
                arrows: true,
                dots: false,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3.5,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2.8,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            };
        }

        if (slider.hasClass('categories')) {
            extraOptions = {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: false,
                centerMode: false,
                arrows: true,
                dots: false,
                autoplay: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4.1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            };
        } if (slider.hasClass('categories-2')) {
            extraOptions = {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: false,
                centerMode: false,
                arrows: true,
                dots: false,
                autoplay: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4.1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            };
        }

        slider.slick($.extend({}, options, extraOptions));
    });
    const $toggle = $('#catalogMegaToggle');
    const $menu = $('#catalogMegaMenu');

    if (!$toggle.length || !$menu.length) return;

    function closeMenu() {
        $menu.prop('hidden', true);
        $toggle.attr('aria-expanded', 'false');
    }

    function openMenu() {
        $menu.prop('hidden', false);
        $toggle.attr('aria-expanded', 'true');
    }

    // Открытие и закрытие по клику на «Каталог»
    $toggle.on('click', function () {
        if ($menu.prop('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // Закрытие при клике вне мегаменю
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#catalogMegaMenu, #catalogMegaToggle').length) {
            closeMenu();
        }
    });

    // Закрытие по Escape
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && !$menu.prop('hidden')) {
            closeMenu();
            $toggle.trigger('focus');
        }
    });

    // Закрытие при переходе на мобильную версию
    $(window).on('resize', function () {
        if (window.innerWidth < 992) {
            closeMenu();
        }
    });
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 0,
        mirror: false,
        disable: function () {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    });

const $counters = $('.counter');

if ($counters.length) {
    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    function animateCounter(element) {
        const $counter = $(element);

        if ($counter.data('animated')) return;

        $counter.data('animated', true);

        const start = Number($counter.attr('data-start')) || 0;
        const target = Number($counter.attr('data-target')) || 0;
        const suffix = $counter.attr('data-suffix') || '';

        if (reduceMotion) {
            $counter.text(target + suffix);
            return;
        }

        $({ value: start }).animate(
            { value: target },
            {
                duration: 1800,
                easing: 'swing',

                step: function (now) {
                    $counter.text(Math.floor(now) + suffix);
                },

                complete: function () {
                    $counter.text(target + suffix);
                }
            }
        );
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    $counters.each(function () {
        observer.observe(this);
    });
}

});