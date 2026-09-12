document.addEventListener("DOMContentLoaded", () => {
    const slideshowImages = document.querySelectorAll(".hero-slideshow .hero-image");
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (slideshowImages.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let activeIndex = 0;
        let slideshowTimer;

        const showNextImage = () => {
            slideshowImages[activeIndex].classList.remove("is-visible");
            activeIndex = (activeIndex + 1) % slideshowImages.length;
            slideshowImages[activeIndex].classList.add("is-visible");
        };

        const startSlideshow = () => {
            slideshowTimer = window.setInterval(showNextImage, 5000);
        };

        const stopSlideshow = () => {
            window.clearInterval(slideshowTimer);
        };

        const slideshow = document.querySelector(".hero-slideshow");
        slideshow.addEventListener("mouseenter", stopSlideshow);
        slideshow.addEventListener("mouseleave", startSlideshow);
        startSlideshow();
    }

    if (!menuToggle || !navigation) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("active");

        navigation.classList.toggle("mobile-open", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    // Close menu when a navigation link is clicked
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navigation.classList.remove("mobile-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });

    // Close menu if the screen becomes desktop-sized
    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) {
            menuToggle.classList.remove("active");
            navigation.classList.remove("mobile-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }
    });
});