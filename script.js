const date = new Date();
let months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const apiKey = '40093c2b-21ba-4190-9278-031af018022b';
const apiUrlPop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const apiUrlPremier = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${date.getUTCFullYear()}&month=${months[date.getUTCMonth()]}`;
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
    data.items.forEach(premier => {
        const premierEl = document.createElement('div');
        premierEl.classList.add('scrollBar__content__movie');
        premierEl.innerHTML = `
            <img src="${premier.posterUrlPreview}" alt="${premier.nameRu}">
        `;
        premiersEl.appendChild(premierEl);
    })

    //Реализация переключения в слайдБаре
    let count = 0;
    let imageWidth;

    const images = document.querySelectorAll('.scrollBar__content__movie');
    const scrollBarInnerWidth = document.querySelector('.scrollBar__inner');
    images.forEach( image => imageWidth = image.offsetWidth + 10)
    
    const scrollBar__forwardBtn = document.querySelector('.scrollBar__forwardBtn');
    scrollBar__forwardBtn.addEventListener('click', function() {
        count++;
        if (count > data.total - (scrollBarInnerWidth.offsetWidth / imageWidth)) {
            count = data.total - (scrollBarInnerWidth.offsetWidth / imageWidth);
        }
        premiersEl.style.transform = 'translate(-' + count * imageWidth + 'px)'
    });

    const scrollBar__backBtn = document.querySelector('.scrollBar__backBtn');
    scrollBar__backBtn.addEventListener('click', function() {
        count--;
        if (count <= 0) {
            count = 0;
        }
        premiersEl.style.transform = 'translate(-' + count * imageWidth + 'px)'
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

// Начало: Заполнение формы для поиска фильма
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
// Конец: Заполнение формы для поиска фильма

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
