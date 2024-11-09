/** 
 * Header & Back top top
 * **/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

/** 
 * Hero Slider
 * **/
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]"); 
const heroSliderNextBtn = document.querySelector("[data-next-btn]"); 

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }
    updateSliderPos();
}

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }
    updateSliderPos();
}

/** 
 * Add event listener for multiple elements
 * **/
const addEventOnElements = function (elements, eventType, callback) {
    if (elements.length === 0) {
        console.warn("No elements found for the provided selector.");
        return; // Exit if no elements
    }

    for (let i = 0; i < elements.length; i++) {
        if (elements[i]) {
            elements[i].addEventListener(eventType, callback);
        } else {
            console.error("Element not found at index:", i);
        }
    }
};

/** 
 * Navbar
 * **/
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("[data-navbar]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const overlay = document.querySelector("[data-overlay]");

    console.log('Nav Togglers:', navTogglers); // Ensure this is not empty

    // Add event listeners for slider buttons
    console.log('Next Button: ', heroSliderNextBtn);
    console.log('Prev Button: ', heroSliderPrevBtn);

    if (heroSliderNextBtn) {
        heroSliderNextBtn.addEventListener("click", function() {
            console.log("Next button clicked");
            slideNext();
        });
    } else {
        console.error("Next button not found");
    }

    if (heroSliderPrevBtn) {
        heroSliderPrevBtn.addEventListener("click", function() {
            console.log("Prev button clicked");
            slidePrev();
        });
    } else {
        console.error("Prev button not found");
    }

    const toggleNavbar = function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("nav-active");
    }

    if (navTogglers.length > 0) {
        addEventOnElements(navTogglers, "click", toggleNavbar);
    } else {
        console.warn("No nav toggler elements found.");
    }

    // Setup slider button event listeners for mouseover and mouseout
    const sliderButtons = [heroSliderNextBtn, heroSliderPrevBtn];
    console.log('Slider Buttons Array:', sliderButtons);

    const filteredButtons = sliderButtons.filter(btn => btn !== null);
    console.log('Filtered Slider Buttons:', filteredButtons);

    if (filteredButtons.length > 0) {
        addEventOnElements(filteredButtons, "mouseover", function () {
            clearInterval(autoSlideInterval);
        });
        addEventOnElements(filteredButtons, "mouseout", autoSlide);
    } else {
        console.error("No slider buttons found.");
    }
});

/**
 * Auto slide
 */
let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
}

window.addEventListener("load", autoSlide);

/** 
 * Parllax Effect
 **/

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(event) {
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5

    // reverse the number eg. 20 -> -20
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }


});