const movieSection = document.querySelector("#movie-section") as HTMLElement;
const selectMovie = document.querySelector("#select-movie") as HTMLElement;
const submitButton = document.querySelector(".submit-button") as HTMLButtonElement;
let unorderList = document.getElementById('unorder-list') as HTMLUListElement;
let twoUnorderList = document.getElementById('two-unorder-list') as HTMLUListElement;
const characterInput = document.getElementById('char-input') as HTMLInputElement;
const openingCrawl = document.querySelector("#opening-crawl") as HTMLParagraphElement;

const displayName = document.querySelector(".display-name") as HTMLParagraphElement;
const birthYear = document.querySelector(".birth-year") as HTMLParagraphElement;
const eyeColor = document.querySelector(".eye-color") as HTMLParagraphElement;
const displayGender = document.querySelector(".display-gender") as HTMLParagraphElement;
const hairColor = document.querySelector(".hair-color") as HTMLParagraphElement;
const displayHeight = document.querySelector(".display-height") as HTMLParagraphElement;



type StarWarsMovie = {
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

const urlMovies = "https://swapi.dev/api/films/";
const urlCharacter = "https://swapi.dev/api/people/?search=";


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
            // movieSection.append(movieTitle);
            unorderList.append(movieTitle);
            movieSection.append(unorderList);
            movieTitle.append(cardButton);
        }


        const aboutButton = document.getElementsByClassName("showAll");

        for (let i = 0; i < aboutButton.length; i++) {
            aboutButton[i].addEventListener("click", async function () {
                openingCrawl.innerHTML = `${dataMovies.results[i].opening_crawl}`;
            });
        };

    });
};
showMovies();



async function getCharacter(search: any) {
    const response = await fetch(urlCharacter + characterInput);
    console.log(urlCharacter + characterInput.value)
    const characterInfo = await response.json();
    return characterInfo;
}

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(urlCharacter + characterInput)


    if (characterInput.value.length > 0) {
        getCharacter(characterInput.value).then((characterInfo) => {
            console.log(characterInfo.results[0].name);
            displayName.innerHTML = `Name: ${characterInfo.results[0].name}`;
            birthYear.innerHTML = `Birth Year: ${characterInfo.birth_year}`;
            eyeColor.innerHTML = `Eye color: ${characterInfo.eye_color}`;
            displayGender.innerHTML = `Gender: ${characterInfo.gender}`;
            hairColor.innerHTML = `Hair color: ${characterInfo.hair_color}`;
            displayHeight.innerHTML = `Height: ${characterInfo.height}`;

        });
    }
});


