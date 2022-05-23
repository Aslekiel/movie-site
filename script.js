const apiKey = "40093c2b-21ba-4190-9278-031af018022b";
const apiUrlPop = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

getMovies(apiUrlPop);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-type": "application/json",
            "X-API-KEY": apiKey,
        }
    })
    const respData = await resp.json();
    console.log(respData);
}

