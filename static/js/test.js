document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".travel-card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });
    });
});
