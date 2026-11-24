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

    const favorites = localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [];

    // Add to localStorage
    if (!isFavorite) {
        localStorage.setItem(
            "favorites",
            JSON.stringify([...favorites, e.target.dataset.product])
        );
    } else {
        localStorage.setItem(
            "favorites",
            JSON.stringify(
                favorites.filter(x => x !== e.target.dataset.product)
            )
        );
    }
};

const loadFavorites = () => {
    const favorites = localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [];

    const favoriteEls = document.querySelectorAll(".favorite");
    favoriteEls.forEach(el => {
        if (favorites.includes(el.dataset.product)) {
            el.textContent = "★";
        }
    });
};

const init = () => {
    registerEvents();
    loadFavorites();
};

init();
