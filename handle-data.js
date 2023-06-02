import Validator from "./validation.js";

const moviesAPI = 'http://localhost:3000/movies';
const usersAPI = 'http://localhost:3000/users';
const searchHistorysAPI = 'http://localhost:3000/searchHistorys';

function getMovies(callback) {
    fetch(moviesAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log('Request failed: ' + error);
        });
}

function getUsers(callback) {
    fetch(usersAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log('Request failed: ' + error);
        });
}

function addUser(user, callback) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    fetch(usersAPI, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log('Request failed: ' + error);
        });
}

function getSearchHistorys(callback) {
    fetch(searchHistorysAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log('Request failed: ' + error);
        });
}

function addSearchHistory(searchHistory, callback) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searchHistory)
    };

    fetch(searchHistorysAPI, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log('Request failed: ' + error);
        });
}

function renderFavoriteMovies(movies = [], number = 0) {
    const favoriteMovieListElement = document.querySelector('.favorite-movie-list');
    if (number > movies.length) {
        number = movies.length;
    }

    let htmls = [];
    for (let i = 0; i < number; i++) {
        let movie = movies[i];
        let string = `
            <li class="main__movie favorite-movie-item" data-id="${movie.id}">
                <a href="./wait-movie.html">
                    <img
                        src="${movie.img}">
                </a>
                <div class="main__movie-content">
                    <a href="#">${movie.name}</a>
                    <h3>${movie.year}</h3>
                    <div class="content__review">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
            </li>                
        `
        htmls.push(string);
    }
    favoriteMovieListElement.innerHTML = htmls.join('');
}

function renderDragMovie(movies = [], additionClass = '') {
    const dragMoviesElement = document.querySelector('.list-film');
    const carouselElement = dragMoviesElement.querySelector('.carousel');
    let html = movies.map((movie) => {
        return `
            <li class="item ${additionClass}" data-id="${movie.id}">
                <a class="hot-movie-item__link" href="./wait-movie.html">
                    <img class="item-img" src="${movie.img}" alt=""
                            draggable="false" />
                    <div class="text">
                        <span class="tittle">
                            <a href="#">${movie.name}</a>
                        </span>
                    </div>
                </a>
            </li>
        `
    }).join('');
    carouselElement.innerHTML = html;
}

function renderNewMovies(movies) {
    const newMovieListElement = document.querySelector('.new-movie-list');
    let html = movies.map((movie) => {
        return `
            <li class="grid__column_2 new-movie-item" data-id="${movie.id}">
                <a class="new-movie-item__link" href="./wait-movie.html">
                    <div class="header__content">                          
                            <div class="content__icon">
                                <i class="fa-sharp fa-solid fa-circle-play "></i>
                            </div>

                            <div class="content__img detail__img"
                                style="background-image: url(${movie.img});">
                            </div>

                            <p class="content__name detail__name">${movie.name}</p>
                    </div>
                </a>
            </li>               
        `
    }).join('');
    newMovieListElement.innerHTML = html;
}

function renderSearchMovies(searchValue = '') {
    getMovies(function (movies) {
        const centerMovieTitleElement = document.querySelector('.center-movies-title');
        const newMovieListElement = document.querySelector('.new-movie-list');
        
        if (searchValue) {
            centerMovieTitleElement.innerText = 'KẾT QUẢ TÌM KIẾM: ' + searchValue;
        } else {
            centerMovieTitleElement.innerText = 'PHIM MỚI CẬP NHẬT';
        }

        let html = movies.map((movie) => {
            if (movie.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return `
                <li class="grid__column_2 search-movie-item" data-id="${movie.id}">
                    <a class="search-movie-item__link" href="./wait-movie.html">
                        <div class="header__content">                          
                                <div class="content__icon">
                                    <i class="fa-sharp fa-solid fa-circle-play "></i>
                                </div>
    
                                <div class="content__img detail__img"
                                    style="background-image: url(${movie.img});">
                                </div>
    
                                <p class="content__name detail__name">${movie.name}</p>
                        </div>
                    </a>
                </li>               
            `
            } else {
                return '';
            }
        }).join('');
        newMovieListElement.innerHTML = html;
    });


}

function renderSearchHistory(searchHistorys = []) {
    const searchWraperElement = document.querySelector('.header__search-option');

    let htmls = [];
    for (let i = searchHistorys.length - 1; i >= 0; i--) {
        let searchHistory = searchHistorys[i];
        if (typeof searchHistory === 'object') {
            let string =  `
                    <div class="result__item search-history-item">
                        <a href="./index.html" class="search-history-item__link">${searchHistory.search}</a>
                    </div>
                `;
            htmls.push(string);
        } else {
            let string = `
                    <div class="result__item search-history-item">
                        <a href="./index.html" class="search-history-item__link">${searchHistory}</a>
                    </div>
                `;
            htmls.push(string);
        }
    }

    // let html = searchHistorys.map(function (searchHistory) {
    //     if (typeof searchHistory === 'object') {
    //         return `
    //             <div class="result__item search-history-item">
    //                 <a href="./index.html" class="search-history-item__link">${searchHistory.search}</a>
    //             </div>
    //         `;
    //     } else {
    //         return `
    //             <div class="result__item search-history-item">
    //                 <a href="./index.html" class="search-history-item__link">${searchHistory}</a>
    //             </div>
    //         `;
    //     }
    // }).join('');

    searchWraperElement.innerHTML = htmls.join('');
}

function handleRenderSearchHistory() {
    const loggedUser = JSON.parse(localStorage.getItem('loginUser'));
    if (loggedUser) {
        getSearchHistorys(function (searchHistorys) {
            let userSearchHistorys = [];
            userSearchHistorys = searchHistorys.filter(function (searchHistory) {
                return searchHistory.userId === loggedUser.id;
            });
            if (userSearchHistorys) {
                renderSearchHistory(userSearchHistorys);
            } else {

            }
            handleClickSearchHistoryItem();
        });
    } else {
        let localSearchHistorys = JSON.parse(localStorage.getItem('localSearchHistorys')) || [];
        renderSearchHistory(localSearchHistorys);
    }
    
}

function handleClickSearchHistoryItem() {
    // save into localStorage when user clicks on search item
    const historyItemElements = document.querySelectorAll('.search-history-item__link');
    Array.from(historyItemElements).forEach(function (historyItemElement) {
        historyItemElement.addEventListener('click', function (e) {
            localStorage.setItem('movieSearch', JSON.stringify(this.innerText));
        });
    });
}

function handleClickMovie(selector = '') {
    const movieElements = document.querySelectorAll(selector);
    Array.from(movieElements).forEach(function (movieElement) {
        movieElement.addEventListener('click', () => {
            localStorage.setItem('selectedMovieID', movieElement.dataset.id);
        });
    });
}

function renderLoggedUser(loggedUser) {
    const authenListElement = document.querySelector('.header-modal_list');
    const loggedUserFullNameElement = document.querySelector('.logged-user__fullname');
    const loggedUserEmailTextElement = document.querySelector('.logged-user__email-text');
    loggedUserFullNameElement.innerText = loggedUser.fullName;
    loggedUserEmailTextElement.innerText = loggedUser.email;
    authenListElement.classList.add('logged');
}

function handleRenderLoggedUser() {
    const loggedUser = JSON.parse(localStorage.getItem('loginUser'));
    if (loggedUser) {
        renderLoggedUser(loggedUser);
    } else {

    }
}

function handleClickLoginButton() {
    const loginButton = document.querySelector('.login-btn');
    loginButton.addEventListener('click', function (e) {
        showModal();
        const modalBodyElement = document.querySelector('.modal__body');
        modalBodyElement.innerHTML = `
            <form action="" method="POST" class="form" id="login-form">
                <h3 class="heading">Đăng nhập</h3>
                <p class="desc">Xem phim mới nhất tại MotChill </p>

                <div class="form-error">
                    <i class="form-error-icon fa-solid fa-circle-exclamation"></i>
                    <span class="form-error-text">Tài khoản hoặc mật khẩu không đúng</span>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" name="email" type="text" placeholder="VD: email@domain.com" class="form-control">
                    <span class="form-message"></span>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Mật khẩu</label>
                    <input id="password" name="password" type="password" placeholder="Nhập mật khẩu"
                        class="form-control">
                    <span class="form-message"></span>
                </div>

                <button class="form-submit">Đăng nhập</button>

                <a href="./index.html">
                    <img src="./assets/img/logo.png" alt="">
                </a>
            </form>
        `;

        Validator({
            form: '#login-form',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isEmail('#email')
            ],
            onSubmit: function (loginInfo) {
                getUsers(function (accounts) {
                    let resultAccount = accounts.find(function (account) {
                        return (account.email === loginInfo.email) && (account.password === loginInfo.password);
                    });

                    if (resultAccount) {
                        location.reload();
                        let savedAccount = {
                            id: resultAccount.id,
                            fullName: resultAccount.fullName,
                            email: resultAccount.email,
                            searchHistory: resultAccount.searchHistory
                        };
                        localStorage.setItem('loginUser', JSON.stringify(savedAccount));

                        const modalElement = document.querySelector('.modal.modal--show');
                        modalElement.classList.remove('modal--show');

                        renderLoggedUser(savedAccount);
                    } else {
                        const formElement = document.querySelector('.modal .form');
                        formElement.classList.add('form--error');
                        localStorage.removeItem('loginUser');
                    }
                });
            }
        });
    });
}

function handleClickRegisterButton() {
    const registerButton = document.querySelector('.register-btn');
    registerButton.addEventListener('click', function (e) {
        showModal();
        const modalBodyElement = document.querySelector('.modal__body');
        modalBodyElement.innerHTML = `
            <form action="" method="POST" class="form" id="register-form">       
                <h3 class="heading">
                    <a href="./index.html">
                        <img src="./assets/img/logo.png" class="img_register" alt="">
                    </a>
                    Đăng Ký thành viên
                </h3>
                <p class="desc">Xem phim mới nhất tại MotChill </p>
        
                <div class="spacer"></div>
        
                <div class="form-group">
                    <label for="fullname" class="form-label">Tên đầy đủ</label>
                    <input id="fullname" name="fullname" type="text" placeholder="VD: Đoàn Anh Kiệt" class="form-control">
                    <span class="form-message"></span>
                </div>
        
                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" name="email" type="text" placeholder="VD: email@domain.com" class="form-control">
                    <span class="form-message"></span>
                </div>
        
                <div class="form-group">
                    <label for="password" class="form-label">Mật khẩu</label>
                    <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" class="form-control">
                    <span class="form-message"></span>
                </div>
        
                <div class="form-group">
                    <label for="password_confirmation" class="form-label">Nhập lại mật khẩu</label>
                    <input id="password_confirmation" name="password_confirmation" placeholder="Nhập lại mật khẩu" type="password" class="form-control">
                    <span class="form-message"></span>
                </div>
    
                <button class="form-submit">Đăng ký</button>
            </form>
        `;

        Validator({
            form: '#register-form',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
                Validator.isEmail('#email'),
                Validator.minLength('#password', 6),
                Validator.isRequired('#password_confirmation'),
                Validator.isConfirmed('#password_confirmation', function () {
                    return document.querySelector('#register-form #password').value;
                }, 'Mật khẩu nhập lại không chính xác')
            ],
            onSubmit: function (registerInfo) {
                let user = {
                    fullName: registerInfo.fullname,
                    email: registerInfo.email,
                    password: registerInfo.password
                }
                addUser(user);
            }
        });
    });
}

function handleCloseModal() {
    const modalElement = document.querySelector('.modal');
    const modalBodyElement = document.querySelector('.modal__body');

    modalBodyElement.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    modalElement.addEventListener('click', function (e) {
        this.classList.remove('modal--show');
        modalBodyElement.innerHTML = '';
    });
}

function handleClickLogoutButton() {
    const logoutButton = document.querySelector('.logged-user__logout-btn');
    logoutButton.addEventListener('click', function (e) {
        localStorage.removeItem('loginUser');
        localStorage.removeItem('selectedMovieID');
        location.href = './index.html';
    });
}

function saveSearchHistory(search, userId) {
    if (userId) {
        const searchHistory = {
            userId,
            search
        };
        addSearchHistory(searchHistory, function () {

        });
    } else {
        let localSearchHistorys = JSON.parse(localStorage.getItem('localSearchHistorys')) || [];
        let isSame = localSearchHistorys.includes(search);
        if (isSame) {
            return;
        }
        localSearchHistorys.push(search);
        localStorage.setItem('localSearchHistorys', JSON.stringify(localSearchHistorys));
    }
}

function handleClickSearchIcon() {
    const searchIconElement = document.querySelector('.header-input__btn');
    searchIconElement.addEventListener('click', function () {
        const centerMovieTitleElement = document.querySelector('.center-movies-title');
        const searchInputElement = document.querySelector('.header-input input');
        let searchValue = searchInputElement.value;

        if (searchValue) {
            let userId = JSON.parse(localStorage.getItem('loginUser'))?.id;
            saveSearchHistory(searchValue, userId);
            localStorage.setItem('movieSearch', JSON.stringify(searchValue));
        }
        location.reload();
    });
}

function showModal() {
    const modalElement = document.querySelector('.modal');
    modalElement.classList.add('modal--show');
}

function handleCarousel() {
    const carousel = document.querySelector(".carousel");
    const item = document.querySelectorAll(".item");
    const btnNext = document.querySelector(".btnNext");
    const btnBack = document.querySelector(".btnBack");
    const firstCardWidth = carousel.querySelector(".item").offsetWidth;
    const carouselChildens = [...carousel.children];
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    carouselChildens
        .slice(-cardPerView, 0)
        .reverse()
        .forEach((card) => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });
    carouselChildens.slice(0, 1).forEach((card) => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
    btnBack.onclick = () => {
        console.log("back");
        carousel.scrollLeft -= firstCardWidth;
    };
    btnNext.onclick = () => {
        console.log("next");
        carousel.scrollLeft += firstCardWidth;
    };
    let isDragging = false,
        startX,
        startScrollLeft;
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };
    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
        item.onclick = (e) => {
            return false;
        };
    };
    const infiniteScroll = () => {
        if (
            Math.ceil(carousel.scrollLeft) ===
            carousel.scrollWidth - carousel.offsetWidth
        ) {
            carousel.scrollLeft = -carousel.offsetWidth;
        }
    };
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
}

export {
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
    handleClickLogoutButton,
    handleClickSearchIcon,
    handleRenderLoggedUser,
    handleRenderSearchHistory,
    renderSearchMovies,
    handleClickSearchHistoryItem,
    showModal,
    handleCarousel
};