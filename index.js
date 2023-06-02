import {
    renderFavoriteMovies,
    handleClickMovie,
    renderDragMovie,
    renderNewMovies,
    renderSearchHistory,
    moviesAPI,
    getMovies,
    handleClickLoginButton,
    handleClickRegisterButton,
    handleCloseModal,
    showModal,
    handleClickLogoutButton,
    handleClickSearchIcon,
    handleRenderLoggedUser,
    renderSearchMovies,
    handleRenderSearchHistory,
    handleClickSearchHistoryItem,
    handleCarousel
} from './handle-data.js';

const home = {
    render(movies = []) {
        let movieSearch = JSON.parse(localStorage.getItem('movieSearch'));
        if (movieSearch) {
            renderSearchMovies(movieSearch);
            localStorage.removeItem('movieSearch');
        } else {
            renderNewMovies(movies);
        }

        renderFavoriteMovies(movies, 10);
        renderDragMovie(movies, 'hot-movie-item');
    },

    loadPage() {
        handleRenderLoggedUser();
        handleRenderSearchHistory();

        getMovies(function (movies) {
            home.render(movies);
            handleCarousel();
            handleClickMovie('.hot-movie-item');
            handleClickMovie('.favorite-movie-item');
            handleClickMovie('.new-movie-item');
            handleClickMovie('.search-movie-item');
        });
    },

    eventHandler: {

    },

    start() {
        this.loadPage();
        handleClickSearchIcon();
        handleClickLoginButton();
        handleClickRegisterButton();
        handleClickLogoutButton();
        handleCloseModal();
        handleClickSearchHistoryItem();
    }
}

home.start();
