import {
  renderFavoriteMovies,
  handleClickMovie,
  renderDragMovie,
  moviesAPI,
  getMovies,
  handleClickLoginButton,
  handleClickRegisterButton,
  handleCloseModal,
  handleClickLogoutButton,
  handleRenderLoggedUser,
  handleRenderSearchHistory,
  handleClickSearchIcon,
  handleClickSearchHistoryItem,
  showModal,
  handleCarousel
} from "./handle-data.js";

import Validator from "./validation.js";

const waitMoviePage = {
  render(movies = []) {
    const waitMovie = movies.find(movie => movie.id === Number(localStorage.getItem('selectedMovieID')));
    const waitMovieImageElement = document.querySelector('.waitMovie__img');
    const waitMovieNameElememt = document.querySelector('.movie__des-title1');
    const waitMovieDescriptionElements = document.querySelectorAll('.movie__des-content span');
    const waitMovieContentElement = document.querySelector('.main__content-des p');
    let waitMovieExtraInfos = [
      waitMovie.director,
      waitMovie.durations,
      waitMovie.language,
      waitMovie.national,
      waitMovie.type,
      waitMovie.actors.join(', ')
    ];

    waitMovieImageElement.style.backgroundImage = `url(${waitMovie.img})`;
    waitMovieNameElememt.innerText = waitMovie.name;

    let waitMovieExtraInfosIndex = 0;
    Array.from(waitMovieDescriptionElements).forEach(function (element) {
      element.innerText = waitMovieExtraInfos[waitMovieExtraInfosIndex++];
    });

    waitMovieContentElement.innerText = waitMovie.description;

    renderFavoriteMovies(movies, 10);
    renderDragMovie(movies, 'recommend-movie-item');
  },

  eventHandler: {
    loadPage() {
      handleRenderLoggedUser();
      handleRenderSearchHistory();

      getMovies(function (movies) {
        waitMoviePage.render(movies);
        handleCarousel();
        handleClickMovie('.favorite-movie-item');
        handleClickMovie('.recommend-movie-item');
      });
    }
  },

  start() {
    this.eventHandler.loadPage();

    handleClickSearchIcon();
    handleClickLoginButton();
    handleClickRegisterButton();
    handleClickLogoutButton();
    handleCloseModal();
    handleClickSearchHistoryItem();
  }
}

waitMoviePage.start();