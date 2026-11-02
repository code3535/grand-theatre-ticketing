
const navigationButtons = document.querySelectorAll(
    ".navigation-controls button"
);

navigationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionName = button.dataset.section;

        const targetSection = document.querySelector(
            `.seat-section[data-section="${sectionName}"]`
        );

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
});
