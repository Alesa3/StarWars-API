const charactersBox = document.querySelector("#characters") as HTMLElement;
const showButton = document.querySelector("show-button") as HTMLButtonElement;

const urlCharacter = "http https://swapi.dev/api/people/";

async function getAllNames() {
    const response = await fetch(urlCharacter);
    const listOfCharacters = await response.json();
    return listOfCharacters;
}

// showButton.addEventListener("click", async (event) =>
//     event.preventDefault();

// getRandomName().then((facts) => {
//     charactersBox.innerHTML = data.name;

// });