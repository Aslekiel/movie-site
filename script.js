const apiKey = '40093c2b-21ba-4190-9278-031af018022b';
const apiUrlPop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const apiUrlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(apiUrlPop);

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

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

function showMovies (data) {
    const moviesEl = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = '';
    
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
}

const form = document.querySelector('form');
const formSearch = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault;
    const apiSearch = `${apiUrlSearch}${formSearch.value}`;
    if (apiSearch) {
        getMovies(apiSearch);
    }
})