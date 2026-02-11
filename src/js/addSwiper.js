document.addEventListener("DOMContentLoaded", function () {
    let mainBannerSwiper = new Swiper(".mainBannerSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,

        speed: 1500,
        slidesPerView: 1,

        effect: "fade",

        pagination: {
            el: ".mainBannerSwiper .sw-pagination",
            clickable: true,
        },
    });
    let serviceBannerSwiper = new Swiper(".serviceBannerSwiper", {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        loop: true,

        speed: 1500,
        slidesPerView: 1,

        effect: "fade",

        pagination: {
            el: ".serviceBannerSwiper .sw-pagination",
            clickable: true,
        },
    });
    let mainServicesSwiper = new Swiper(".mainServicesSwiper", {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        loop: false,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw_cont_services .sw-next-btn",
            prevEl: ".sw_cont_services .sw-prev-btn",
        },
        scrollbar: {
            el: ".sw_cont_services .swiper-scrollbar",
            hide: true,
        },

        breakpoints: {
            1550: {
                slidesPerView: 4,
            },
        },
    });
    let mainDoctorsSwiper = new Swiper(".mainDoctorsSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw_cont_doctors .sw-next-btn",
            prevEl: ".sw_cont_doctors .sw-prev-btn",
        },
        scrollbar: {
            el: ".sw_cont_doctors .swiper-scrollbar",
            hide: true,
        },

    });
    let mainEquipmentSwiper = new Swiper(".mainEquipmentSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw-cont_equipment .sw-next-btn",
            prevEl: ".sw-cont_equipment .sw-prev-btn",
        },
        scrollbar: {
            el: ".sw-cont_equipment .swiper-scrollbar",
            hide: true,
        },

        breakpoints: {
            721: {
                slidesPerView: 2,
            },
            1281: {
                slidesPerView: 3,
            },
        },
    });
    let mainAboutSwiper = new Swiper(".mainAboutSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
            nextEl: ".mainAboutSwiper .sw-next-btn",
            prevEl: ".mainAboutSwiper .sw-prev-btn",
        },
        pagination: {
            el: ".mainAboutSwiper .sw-pagination",
            clickable: true,
        },
    });

    let mainAdvantagesSwiper = new Swiper(".mainAdvantagesSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: false,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        scrollbar: {
            el: ".sw_cont_advantages .swiper-scrollbar",
            hide: true,
        },
    });
    let mainReviewsSwiper = new Swiper(".mainReviewsSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        scrollbar: {
            el: ".sw_cont_reviews .swiper-scrollbar",
            hide: true,
        },
        breakpoints: {
            721: {
                spaceBetween: 24,
                slidesPerView: 2,
            },
            1281: {
                slidesPerView: 3,
            },
        },
    });

    let mainBlogSwiper = new Swiper(".mainBlogSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        scrollbar: {
            el: ".sw_cont_blog .swiper-scrollbar",
            hide: true,
        },
        navigation: {
            nextEl: ".sw_cont_blog .sw-next-btn",
            prevEl: ".sw_cont_blog .sw-prev-btn",
        },
        breakpoints: {
            721: {
                spaceBetween: 24,
                slidesPerView: 2,
            },
            1281: {
                slidesPerView: 3,
            },
        },
    });
    let mainGalleryTopSwiper = new Swiper(".mainGalleryTopSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: false,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 2,
    });
    let mainGalleryMiddleSwiper = new Swiper(".mainGalleryMiddleSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: false,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 2,
    });
    let mainGalleryBottomSwiper = new Swiper(".mainGalleryBottomSwiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: false,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 2,
    });
    let beforeAfterSwiper = new Swiper(".before-after-swiper", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: true,
        navigation: {
            nextEl: ".sw_cont_before-after .sw-next-btn",
            prevEl: ".sw_cont_before-after .sw-prev-btn",
        },
        scrollbar: {
            el: ".sw_cont_before-after .swiper-scrollbar",
            hide: true,
        },
        pagination: {
            el: ".sw_cont_before-after .sw-pagination",
            clickable: true,
        },

        breakpoints: {
            721: {
                centeredSlides: false,
            },
        },
    });
    let howSwiper = new Swiper(".how-swiper", {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        loop: false,
        speed: 1500,
        slidesPerView: "auto",
        spaceBetween: 10,
        centeredSlides: false,
        scrollbar: {
            el: ".sw_cont_how .swiper-scrollbar",
            hide: true,
        },
    });

    if (document.querySelector('.isAdmin')) {
        console.log('addSwiper.js finish work');
    }
});