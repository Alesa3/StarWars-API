const movieSection = document.querySelector("#movie-section");
const submitButton = document.querySelector(".submit-button");
let unorderList = document.getElementById("unorder-list");
const openingMovie = document.getElementById("openingMovie");
const characterInput = document.getElementById("char-input");
const urlMovies = "https://swapi.dev/api/films/";
const urlCharacter = "https://swapi.dev/api/people/";
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
showMovies();
const displayName = document.querySelector(".display-name");
const birthYear = document.querySelector(".birth-year");
const eyeColor = document.querySelector(".eye-color");
const displayGender = document.querySelector(".display-gender");
const hairColor = document.querySelector(".hair-color");
const displayHeight = document.querySelector(".display-height");
async function getCharacter(id) {
    const response = await fetch(urlCharacter + id);
    console.log(urlCharacter);
    const characterInfo = await response.json();
    return characterInfo;
}
submitButton.addEventListener("click", (event)=>{
    event.preventDefault();
    if (characterInput.value.length > 0) getCharacter(characterInput.value).then((characterInfo)=>{
        displayName.innerHTML = `Name: ${characterInfo.name}`;
        birthYear.innerHTML = `Birth Year: ${characterInfo.birth_year}`;
        eyeColor.innerHTML = `Eye color: ${characterInfo.eye_color}`;
        displayGender.innerHTML = `Gender: ${characterInfo.gender}`;
        hairColor.innerHTML = `Hair color: ${characterInfo.hair_color}`;
        displayHeight.innerHTML = `Height: ${characterInfo.height}`;
        characterInput.value = "";
    });
});

//# sourceMappingURL=index.28400941.js.map
