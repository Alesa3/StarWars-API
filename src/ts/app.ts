/*--- Url ---*/
const urlMovies = "https://swapi.dev/api/films/";
const urlCharacter = "https://swapi.dev/api/people/?search=";
const urlPlanetsOne = "https://swapi.dev/api/planets/";

/*--- Movie title html elements ---*/
const movieSection = document.querySelector("#movie-section") as HTMLElement;
const selectMovie = document.querySelector("#select-movie") as HTMLElement;
const submitButton = document.querySelector(".submit-button") as HTMLButtonElement;
let unorderList = document.getElementById('unorder-list') as HTMLUListElement;
const characterInput = document.getElementById('char-input') as HTMLInputElement;
const openingCrawl = document.querySelector("#opening-crawl") as HTMLParagraphElement;
const openingTitle = document.querySelector("#opening-title") as HTMLDivElement;

/*--- HMTL Elements for the Search function --*/
const displayName = document.querySelector(".display-name") as HTMLParagraphElement;
const birthYear = document.querySelector(".birth-year") as HTMLParagraphElement;
const eyeColor = document.querySelector(".eye-color") as HTMLParagraphElement;
const displayGender = document.querySelector(".display-gender") as HTMLParagraphElement;
const hairColor = document.querySelector(".hair-color") as HTMLParagraphElement;
const displayHeight = document.querySelector(".display-height") as HTMLParagraphElement;

/*--- Planet section ---*/
const tatoPlanet = document.querySelector(".tato-planet") as HTMLUListElement;
const dagoPlanet = document.querySelector(".dago-planet") as HTMLUListElement;
const yavinPlanet = document.querySelector(".yavin-planet") as HTMLUListElement;
const mustaPlanet = document.querySelector(".musta-planet") as HTMLUListElement;
const planetFacts = document.querySelector("#planet-facts") as HTMLElement;
const errorMessage = document.getElementById('error-message') as HTMLSpanElement;


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


/* Function to fetch all movie titles. While pressing on them, more info displayed on another section */

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
        const movieHeader = document.createElement('h5');

        for (let i = 0; i < aboutButton.length; i++) {
            aboutButton[i].addEventListener("click", async function () {
                movieHeader.innerHTML = `${dataMovies.results[i].title}`;
                openingCrawl.innerHTML = `${dataMovies.results[i].opening_crawl}`;
                openingCrawl.append(movieHeader)

            });
        };
    });
}

showMovies();


/*-- Get character info once submitting the form --*/

async function getCharacter(search: any) {
    const response = await fetch(urlCharacter + search);
    const characterInfo = await response.json();
    return characterInfo;
}

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (characterInput.value.length > 0) {
        getCharacter(characterInput.value).then((characterInfo) => {
            displayName.innerHTML = `Name: ${characterInfo.results[0].name}`;
            birthYear.innerHTML = `Birth Year: ${characterInfo.results[0].birth_year}`;
            eyeColor.innerHTML = `Eye color: ${characterInfo.results[0].eye_color}`;
            displayGender.innerHTML = `Gender: ${characterInfo.results[0].gender}`;
            hairColor.innerHTML = `Hair color: ${characterInfo.results[0].hair_color}`;
            displayHeight.innerHTML = `Height: ${characterInfo.results[0].height}`;
            characterInput.value = "";

        });
    } else {
        alert('Please enter a name.');
    }
});

/*--- get Planets ---*/

async function getPlanets() {
    const response = await fetch(urlPlanetsOne);
    const factsPlanet = await response.json();
    return factsPlanet;
}

function getPlanetFact() {
    getPlanets().then((factsPlanet) => {

        tatoPlanet.innerHTML = `<li>${factsPlanet.results[0].name} 
        is the home of Luke Skywalker and the first planet ever visited in Star Wars.</li>`;


        dagoPlanet.innerHTML = `<li>${factsPlanet.results[4].name} 
        is the disgusting swamp planet where Luke Skywalker seeks out the training of Yoda. 
        <br>This planet may seem like the perfect hiding spot for Yoda because it's one massive swamp, 
        but the actual reason is actually much more nuanced than that.</li>`;


        yavinPlanet.innerHTML = `<li>${factsPlanet.results[2].name} 
        is the fourth moon of the planet Yavin. 
        The moon is completely covered in jungles, making it a perfect home for the Rebel Base in A New Hope.</li>`


        mustaPlanet.innerHTML = `<li>${factsPlanet.results[9].name} 
        is famous for being the location of Anakin Skywalker's duel with his old master,
        Obi-Wan Kenobi. <br> It's certainly a striking location for a duel, seeing as its surface is 35% lava.</li>`

    })
};

getPlanetFact();
