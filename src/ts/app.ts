const movieSection = document.querySelector("#movie-section") as HTMLElement;
const submitButton = document.querySelector("submit-button") as HTMLButtonElement;
let unorderList = document.getElementById('unorder-list') as HTMLUListElement;




const urlMovies = "https://swapi.dev/api/films/";

async function getMovies() {
    const response = await fetch(urlMovies);
    const dataMovies = await response.json();
    return dataMovies;
}

function showMovies() {
    getMovies().then((dataMovies) => {
        for (let i = 0; i < dataMovies.results.length; i++) {
            const movieTitle = document.createElement('li');

            movieTitle.innerHTML = `${dataMovies.results[i].title}`;
            // movieSection.append(movieTitle);
            unorderList.append(movieTitle);
            movieSection.append(unorderList);



        }
    });
};

showMovies();