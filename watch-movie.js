import {
    moviesAPI,
    getMovies,
    handleClickLoginButton,
    handleClickRegisterButton,
    handleCloseModal,
    handleRenderLoggedUser,
    handleRenderSearchHistory,
    handleClickLogoutButton,
    handleClickSearchIcon,
    handleClickSearchHistoryItem,
    renderDragMovie,
    handleClickMovie
} from './handle-data.js';
import Validator from "./validation.js";

const watchMoviePage = {

    render(movies = []) {
        let watchedMovie = movies.find(movie =>
            movie.id === Number(localStorage.getItem('selectedMovieID')));
        const videoPlayerElement = document.querySelector('.video-player');
        const watchedMovieNameElement = document.querySelector('.details .name h1');
        const watchedMovieDescElement = document.querySelector('.details .short-description');

        videoPlayerElement.src = watchedMovie.url;
        watchedMovieNameElement.innerText = watchedMovie.name;
        watchedMovieDescElement.innerText = watchedMovie.description;

        renderDragMovie(movies, 'carousel');
    },

    loadPage() {
        handleRenderLoggedUser();
        handleRenderSearchHistory();

        getMovies(function (movies) {
            watchMoviePage.render(movies);
            handleClickMovie('.item.carousel');
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

watchMoviePage.start();