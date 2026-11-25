const registerEvents = () => {
    const favoriteEls = document.querySelectorAll(".favorite");

    if (favoriteEls.length) {
        favoriteEls.forEach(el => {
            el.addEventListener("click", onFavoriteClick);
        });
    }

    const formSubmitEl = document.querySelector(".contact-form");
    if (formSubmitEl) {
        formSubmitEl.addEventListener("submit", onFormSubmit);
    }
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
            el.title = "Remove from favorites";
        }
    });
};

const onFormSubmit = e => {
    e.preventDefault();

    clearErrors();

    const name = e.target.querySelector("input[name=name]").value.trim();
    const email = e.target.querySelector("input[name=email]").value.trim();
    const message = e.target
        .querySelector("textarea[name=inquiry]")
        .value.trim();

    if (!name) {
        showError("name-error", "Name is required.");
        return;
    }
    if (!email) {
        showError("email-error", "Email is required.");
        return;
    }
    if (!message) {
        showError("inquiry-error", "Message is required.");
        return;
    }

    if (name.length < 2) {
        showError("name-error", "Name must be at least 2 characters.");
        return;
    }
    if (email.length < 5) {
        showError("email-error", "Email must be at least 5 characters.");
        return;
    }
    if (message.length < 10) {
        showError("inquiry-error", "Message must be at least 10 characters.");
        return;
    }
};

const clearErrors = () => {
    const errorEls = document.querySelectorAll(".error-message");
    errorEls.forEach(el => {
        el.textContent = "";
    });
};

const showError = (id, message) => {
    const errorEl = document.getElementById(id);
    errorEl.textContent = message;
};

const init = () => {
    registerEvents();
    loadFavorites();
};

init();
