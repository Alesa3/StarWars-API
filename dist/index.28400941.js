const movieSection = document.querySelector("#movie-section");
const submitButton = document.querySelector("submit-button");
let unorderList = document.getElementById("unorder-list");
const openingMovie = document.getElementById("openingMovie");
const characterInput = document.getElementById("char-input");
const displayFact = document.querySelector(".display-fact");
const urlMovies = "https://swapi.dev/api/films/";
const urlPlanets = "https://swapi.dev/api/planets/:";
async function getMovies() {
    const response = await fetch(urlMovies);
    const dataMovies = await response.json();
    return dataMovies;
}
function showMovies() {
    getMovies().then((dataMovies)=>{
        for(let i = 0; i < dataMovies.results.length; i++){
            const movieTitle = document.createElement("li");
            movieTitle.innerHTML = `${dataMovies.results[i].title}`;
            const cardButton = document.createElement("button");
            cardButton.className = "showAll";
            cardButton.innerHTML = "See more";
            // movieSection.append(movieTitle);
            unorderList.append(movieTitle);
            movieSection.append(unorderList);
            movieTitle.append(cardButton);
        }
        const aboutButton = document.getElementsByClassName("showAll");
        for(let i = 0; i < aboutButton.length; i++)aboutButton[i].addEventListener("click", function() {
            openingMovie.innerHTML = `${dataMovies.results[i].opening_crawl}`;
        });
    });
}
showMovies(); // async function getPlanet(id: string) {
 //     const response = await fetch(urlPlanets + id);
 //     const characterInfo = await response.json();
 //     return characterInfo;
 // }
 // submitButton.addEventListener("click", (event) => {
 //     event.preventDefault();
 //     if (characterInput.value.length > 0) {
 //         getPlanet(characterInput.value).then((characterInfo) => {
 //             displayFact.innerHTML = characterInfo.name;
 //             characterInput.value = "";
 //         });
 //     }
 // });

//# sourceMappingURL=index.28400941.js.map
