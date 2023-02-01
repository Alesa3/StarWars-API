const movieSection = document.querySelector("#movie-section");
const submitButton = document.querySelector("submit-button");
const urlMovies = "https://swapi.dev/api/films/";
async function getMovies() {
    const response = await fetch(urlMovies);
    const dataMovies = await response.json();
    return dataMovies;
}
function showMovies() {
    getMovies().then((dataMovies)=>{
        for(let i = 0; i < dataMovies.results.length; i++){
            const movieTitle = document.createElement("p");
            movieTitle.innerHTML = `${dataMovies.results[i].title}`;
            movieSection.append(movieTitle);
        }
    });
}
showMovies();

//# sourceMappingURL=index.28400941.js.map
