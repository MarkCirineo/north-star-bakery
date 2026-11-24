const registerEvents = () => {
    const favoriteEls = document.querySelectorAll(".favorite");

    favoriteEls.forEach(el => {
        el.addEventListener("click", onFavoriteClick);
    });
};

const onFavoriteClick = e => {
    const isFavorite = e.target.textContent === "★";

    // Update text content
    e.target.textContent = isFavorite ? "☆" : "★";
    // Update tooltip
    e.target.title = isFavorite ? "Add to favorites" : "Remove from favorites";

    // Add to localStorage
    if (!isFavorite) {
        localStorage.setItem(`favorite-${e.target.dataset.product}`, "true");
    } else {
        localStorage.removeItem(`favorite-${e.target.dataset.product}`);
    }
};

const loadFavorites = () => {
    const favoriteEls = document.querySelectorAll(".favorite");
    favoriteEls.forEach(el => {
        if (localStorage.getItem(`favorite-${el.dataset.product}`)) {
            el.textContent = "★";
        }
    });
};

const init = () => {
    registerEvents();
    loadFavorites();
};

init();
