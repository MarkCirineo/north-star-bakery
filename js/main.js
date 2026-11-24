const favoriteEls = document.querySelectorAll(".favorite");

for (const el of favoriteEls) {
    el.addEventListener("click", () => {
        el.textContent = el.textContent === "☆" ? "★" : "☆";
    });
}
