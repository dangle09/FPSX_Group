/* =========================================================
   FPSXGROUP HOME
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    elements.forEach((element) => {

        observer.observe(element);

    });


});