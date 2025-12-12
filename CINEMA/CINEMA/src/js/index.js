import { rechercherFilms } from "./api.js";

console.log("--- Lancement du test API ---");

rechercherFilms("Batman").then((resultats) => {
    console.log("Réponse de l'API reçue :", resultats);
});