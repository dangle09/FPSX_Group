const mobileButton = document.getElementById("mobileButton");
const navbar = document.querySelector(".navbar");


// ========================================
// MOBILE MENU
// ========================================

mobileButton.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


// ========================================
// MOBILE GAMES DROPDOWN
// ========================================

const dropdown = document.querySelector(".nav-dropdown");
const dropdownButton = document.querySelector(".dropdown-button");

dropdownButton.addEventListener("click", (e) => {

    if (window.innerWidth <= 750) {

        e.preventDefault();

        dropdown.classList.toggle("active");

    }

});


// ========================================
// CLOSE MOBILE MENU
// ========================================

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (
            window.innerWidth <= 750 &&
            !link.classList.contains("dropdown-button")
        ) {

            navbar.classList.remove("active");

        }

    });

});


// ========================================
// HEADER SCROLL EFFECT
// ========================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.background =
            "rgba(5, 5, 5, 0.95)";

    } else {

        header.style.background =
            "rgba(8, 8, 8, 0.82)";

    }

});


// ========================================
// REVEAL ANIMATION
// ========================================

const cards = document.querySelectorAll(
    ".game-card, .ranking-item"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});