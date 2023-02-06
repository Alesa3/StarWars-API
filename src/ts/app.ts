
//first section url
const movieSection = document.querySelector("#movie-section") as HTMLElement;
const selectMovie = document.querySelector("#select-movie") as HTMLElement;
const submitButton = document.querySelector(".submit-button") as HTMLButtonElement;
let unorderList = document.getElementById('unorder-list') as HTMLUListElement;
let twoUnorderList = document.getElementById('two-unorder-list') as HTMLUListElement;
const characterInput = document.getElementById('char-input') as HTMLInputElement;
const openingCrawl = document.querySelector("#opening-crawl") as HTMLParagraphElement;
const openingTitle = document.querySelector("#opening-title") as HTMLDivElement;


//HMTL Elements for the Search function
const displayName = document.querySelector(".display-name") as HTMLParagraphElement;
const birthYear = document.querySelector(".birth-year") as HTMLParagraphElement;
const eyeColor = document.querySelector(".eye-color") as HTMLParagraphElement;
const displayGender = document.querySelector(".display-gender") as HTMLParagraphElement;
const hairColor = document.querySelector(".hair-color") as HTMLParagraphElement;
const displayHeight = document.querySelector(".display-height") as HTMLParagraphElement;

//last section url
const planetName = document.querySelector(".planet-name") as HTMLParagraphElement;
const clickBtn = document.querySelector(".click-btn") as HTMLButtonElement;


const urlMovies = "https://swapi.dev/api/films/";
const urlCharacter = "https://swapi.dev/api/people/?search=";
const urlPlanetsOne = "https://swapi.dev/api/planets/1/";

type StarWarsMovie = {
    title: string,
    opening_crawl: string
}

type Character = {
    name: string,
    birth_year: number | string,
    eye_color: string,
    gender: string,
    hair_color: string,
    height: string,
}

type Planet = {
    name: string
}

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
            const cardButton = document.createElement('button');
            cardButton.className = "showAll";
            cardButton.innerHTML = "See more";
            unorderList.append(movieTitle);
            movieSection.append(unorderList);
            movieTitle.append(cardButton);
        }


        const aboutButton = document.getElementsByClassName("showAll");

        const movieHeader = document.createElement('h4');

        for (let i = 0; i < aboutButton.length; i++) {
            aboutButton[i].addEventListener("click", async function () {


                movieHeader.innerHTML = `${dataMovies.results[i].title}`;
                openingCrawl.innerHTML = `${dataMovies.results[i].opening_crawl}`;

                openingCrawl.append(movieHeader)
            });
        };

    });
};
showMovies();



async function getCharacter(search: any) {
    const response = await fetch(urlCharacter + search);
    const characterInfo = await response.json();
    return characterInfo;
}

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();


    if (characterInput.value.length > 0) {
        getCharacter(characterInput.value).then((characterInfo) => {

            // console.log(characterInfo.results[0]);

            displayName.innerHTML = `Name: ${characterInfo.results[0].name}`;
            birthYear.innerHTML = `Birth Year: ${characterInfo.results[0].birth_year}`;
            eyeColor.innerHTML = `Eye color: ${characterInfo.eye_color}`;
            displayGender.innerHTML = `Gender: ${characterInfo.results[0].gender}`;
            hairColor.innerHTML = `Hair color: ${characterInfo.hair_color}`;
            displayHeight.innerHTML = `Height: ${characterInfo.results[0].height}`;

            characterInput.value = "";

        });
    }
});


async function getPlanets() {
    const response = await fetch(urlPlanetsOne);
    const factsPlanet = await response.json();
    return factsPlanet;
}

function getPlanetFact() {
    getPlanets().then((factsPlanet) => {

        const planetHeader = document.createElement('h2');
        planetHeader.innerHTML = "Random facts about Planets";

        planetName.innerHTML = `${factsPlanet.name} is the home of Luke Skywalker and the first planet ever visited in Star Wars. Because of this, even if it is hated by Anakin and Luke alike, it holds a special place in the hearts of fans across the world. It's grimy and crime-ridden, yet teeming with kooky characters and intrigue. `;
        planetName.append(planetHeader);
        //vill add a next button and display more facts with more urls
    })

};
getPlanetFact();
