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
        movieTitle.appendChild(cardButton);
        
        const heartIcon = document.createElement('span');
        heartIcon.className = "heart-icon";
        heartIcon.innerHTML = "&#x2661;"; 
        movieTitle.appendChild(heartIcon);
        
        unorderList.append(movieTitle);
        movieSection.append(unorderList);
      }
  
      const aboutButton = document.getElementsByClassName("showAll");
      const heartIcons = document.getElementsByClassName("heart-icon");
      const movieHeader = document.createElement('h5');
  
      for (let i = 0; i < aboutButton.length; i++) {
        aboutButton[i].addEventListener("click", async function () {
          movieHeader.innerHTML = `${dataMovies.results[i].title}`;
          openingCrawl.innerHTML = `${dataMovies.results[i].opening_crawl}`;
          openingCrawl.append(movieHeader);
        });
  
        heartIcons[i].addEventListener("click", function () {
          toggleHeartIcon(i);
          saveToFavorites(dataMovies.results[i].title);
        });
      }
  
      function toggleHeartIcon(index: number) {
        const heartIcons = document.getElementsByClassName("heart-icon");
        const icon = heartIcons[index];
  
        if (icon.classList.contains("filled")) {
          icon.classList.remove("filled");
          icon.innerHTML = "&#x2661;";
          removeFavorite(dataMovies.results[index].title);
        } else {
          icon.classList.add("filled");
          icon.innerHTML = "&#x2665;"; 
          addFavorite(dataMovies.results[index].title);
        }
      }
  
      function addFavorite(movieTitle: string) {
        favorites.push(movieTitle);
        console.log("Added to favorites:", movieTitle);
        saveToFavorites(favorites);
        displayFavorites();
      }
  
      function removeFavorite(movieTitle: string) {
        const index = favorites.indexOf(movieTitle);
        if (index > -1) {
          favorites.splice(index, 1);
          console.log("Removed from favorites:", movieTitle);
          saveToFavorites(favorites);
            displayFavorites();
        }
      }

      function saveToFavorites(favorites: any) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      function displayFavorites() {
        const favoritesList = document.getElementById("favorites-list") as HTMLElement;
        favoritesList.innerHTML = "";

        for (let i = 0; i < favorites.length; i++) {
          const favoriteItem = document.createElement('li');
          favoriteItem.innerHTML = favorites[i];
          favoritesList.appendChild(favoriteItem);
        }
      }
    });
  }

  const favorites: string[] = [];

  showMovies();



/*-- Search button that takes user input and returns correct information --*/

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

// async function getPlanets() {
//     const response = await fetch(urlPlanetsOne);
//     const factsPlanet = await response.json();
//     return factsPlanet;
// }

// function getPlanetFact() {
//     getPlanets().then((factsPlanet) => {

        // tatoPlanet.innerHTML = `<li>${factsPlanet.results[0].name} 
        // is the home of Luke Skywalker and the first planet ever visited in Star Wars.</li>`;

        // dagoPlanet.innerHTML = `<li>${factsPlanet.results[4].name} 
        // is the disgusting swamp planet where Luke Skywalker seeks out the training of Yoda. 
        // <br>This planet may seem like the perfect hiding spot for Yoda because it's one massive swamp, 
        // but the actual reason is actually much more nuanced than that.</li>`;

        // yavinPlanet.innerHTML = `<li>${factsPlanet.results[2].name} 
        // is the fourth moon of the planet Yavin. 
        // The moon is completely covered in jungles, making it a perfect home for the Rebel Base in A New Hope.</li>`

        // mustaPlanet.innerHTML = `<li>${factsPlanet.results[9].name} 
        // is famous for being the location of Anakin Skywalker's duel with his old master,
        // Obi-Wan Kenobi. <br> It's certainly a striking location for a duel, seeing as its surface is 35% lava.</li>`

//     })
// };

// getPlanetFact();
// function saveToFavorites(title: any) {
//     throw new Error("Function not implemented.");
// }

