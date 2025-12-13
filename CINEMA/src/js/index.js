import { rechercherFilms } from "./api.js";

const conteneurFilms = document.getElementById("movies-container");
const bouton2024 = document.getElementById("btn-2024");

const creerCarteFilm = (film) => {
  const carte = document.createElement("div");
  carte.classList.add("movie-card");

  const image = film.Poster !== "N/A" ? film.Poster : "https://via.placeholder.com/200x300?text=Pas+d'image";

  carte.innerHTML = `
    <img src="${image}" alt="${film.Title}" style="width: 100%; max-width: 200px; border-radius: 8px;">
    <h3>${film.Title}</h3>
    <p>Année : ${film.Year}</p>
    <a href="movie.html?id=${film.imdbID}">Voir les détails</a>
  `;

  return carte;
};

const initialiserPage = async () => {
  conteneurFilms.innerHTML = "<p>Chargement des films...</p>";

  const listeFilms = await rechercherFilms("Kubrick");

  conteneurFilms.innerHTML = "";

if (listeFilms.length > 0) {
      const selectionFilms = listeFilms.slice(0, 4);
      selectionFilms.forEach((film) => {
        const carteHTML = creerCarteFilm(film);
        conteneurFilms.appendChild(carteHTML);
      });
  } else {
      conteneurFilms.innerHTML = "<p>Aucun film trouvé.</p>";
  }
};

initialiserPage();

if(bouton2024){
    bouton2024.addEventListener("click", async () => {
        bouton2024.innerText = "Chargement...";
        const films2024 = await rechercherFilms("2024");

        if(films2024.length > 0){
             films2024.forEach((film) => {
                if(film.Year.includes("2024")){
                    const carte = creerCarteFilm(film);
                    conteneurFilms.appendChild(carte);
                }
             });
             bouton2024.style.display = "none";
        } else {
            bouton2024.innerText = "Pas de films trouvés";
        }
    });
}