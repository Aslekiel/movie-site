const apiKey = '40093c2b-21ba-4190-9278-031af018022b';
const apiUrlPop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const apiUrlPremier = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=JANUARY';
const apiUrlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getPremierMovies(apiUrlPremier);
getMovies(apiUrlPop);

// Начало: Получение фильмов-премьер
async function getPremierMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': apiKey,
        }
    })
    const respData = await resp.json();
    showPremiers(respData);
}

function showPremiers (data) {
    const premiersEl = document.querySelector('.scrollBar__content');

    // for (let i = 0; i < 5; i++) {
    //     const premierEl = document.createElement('div');
    //     premierEl.classList.add('scrollBar__content');
    //     premierEl.innerHTML = `
    //         <div class="scrollBar__content__movie">
    //             <img src="${data.items[i].posterUrlPreview}" alt="${data.items[i].nameRu}">
    //         </div>
    //     `;
    //     premiersEl.appendChild(premierEl);
    // }
    data.items.forEach(premier => {
        const premierEl = document.createElement('div');
        premierEl.classList.add('scrollBar__content__movie');
        premierEl.innerHTML = `
            <img src="${premier.posterUrlPreview}" alt="${premier.nameRu}">
        `;
        premiersEl.appendChild(premierEl);
    })
};
// Конец: Получение фильмов-премьер

// Начало: Получение Топ-100 фильмов
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': apiKey,
        }
    })
    const respData = await resp.json();
    showMovies(respData);
}

function showMovies (data) {
    const moviesEl = document.querySelector('.movies');
    data.films.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__inner">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        </div>
        <div class="movie__info">
            <div class="movie__info-title">${movie.nameRu}</div>
            <div class="movie__info-category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
            <div class="movie__info-averange movie__info-averange-${getClassByRate(movie.rating)}">${movie.rating}</div>
        </div>
        `
        moviesEl.appendChild(movieEl)
    })
};
// Конец: Получение Топ-100 фильмов

// Начало: Заполнение вормы для поиска фильма
const form = document.querySelector('form');
const formSearch = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault;
    const apiSearch = `${apiUrlSearch}${formSearch.value}`;
    if (apiSearch) {
        document.querySelector('.movies').innerHTML = '';
        getMovies(apiSearch);
    }
})
// Конец: Заполнение вормы для поиска фильма

// Начало: Рейтинг фильма
function getClassByRate(vote) {
    if (vote >= 7) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}
// Конец: Рейтинг фильма

let offset = 0;

const scrollBar__backBtn = document.querySelector('.scrollBar__backBtn');
const scrollBar__forwardBtn = document.querySelector('.scrollBar__forwardBtn');

const scrollBar = document.querySelector('.scrollBar__content');

scrollBar__backBtn.addEventListener('click', function() {
    offset -= 220;
    if (offset < -20000) {
        offset = 0;
    }
    scrollBar.style.left = offset + 'px';
});

scrollBar__forwardBtn.addEventListener('click', function() {
    offset += 220;
    if (offset > 1800) {
        offset = 0;
    }
    scrollBar.style.left = offset + 'px';
})
