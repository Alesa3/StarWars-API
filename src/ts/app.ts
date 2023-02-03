const movieSection = document.querySelector("#movie-section") as HTMLElement;
const submitButton = document.querySelector(".submit-button") as HTMLButtonElement;
let unorderList = document.getElementById('unorder-list') as HTMLUListElement;
const openingMovie = document.getElementById('openingMovie') as HTMLParagraphElement;
const characterInput = document.getElementById('char-input') as HTMLInputElement;


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
const urlCharacter = "https://swapi.dev/api/people/";


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
            aboutButton[i].addEventListener("click", function () {
                openingMovie.innerHTML = `${dataMovies.results[i].opening_crawl}`;

            });
        };

    });
};
showMovies();


const displayName = document.querySelector(".display-name") as HTMLParagraphElement;
const birthYear = document.querySelector(".birth-year") as HTMLParagraphElement;
const eyeColor = document.querySelector(".eye-color") as HTMLParagraphElement;
const displayGender = document.querySelector(".display-gender") as HTMLParagraphElement;
const hairColor = document.querySelector(".hair-color") as HTMLParagraphElement;
const displayHeight = document.querySelector(".display-height") as HTMLParagraphElement;



async function getCharacter(id: string) {
    const response = await fetch(urlCharacter + id);
    console.log(urlCharacter);
    const characterInfo = await response.json();
    return characterInfo;
}


submitButton.addEventListener("click", (event) => {
    event.preventDefault();


    if (characterInput.value.length > 0) {
        getCharacter(characterInput.value).then((characterInfo) => {
            displayName.innerHTML = `Name: ${characterInfo.name}`;
            birthYear.innerHTML = `Birth Year: ${characterInfo.birth_year}`;
            eyeColor.innerHTML = `Eye color: ${characterInfo.eye_color}`;
            displayGender.innerHTML = `Gender: ${characterInfo.gender}`;
            hairColor.innerHTML = `Hair color: ${characterInfo.hair_color}`;
            displayHeight.innerHTML = `Height: ${characterInfo.height}`;
            characterInput.value = "";

        });
    }
});