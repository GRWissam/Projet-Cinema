const API_KEY = "200102d"; 
const URL_BASE = "https://www.omdbapi.com/";

export const rechercherFilms = async (recherche, page = 1) => {
  try {
    const url = `${URL_BASE}?apikey=${API_KEY}&s=${recherche}&page=${page}`;
    
    const reponse = await fetch(url);
    const donnees = await reponse.json();

    if (donnees.Response === "True") {
      return donnees.Search; 
    } else {
      console.error("Erreur API :", donnees.Error);
      return [];
    }
  } catch (erreur) {
    console.error("Erreur réseau :", erreur);
    return [];
  }
};

export const recupererDetailsFilm = async (id) => {
  try {
    const url = `${URL_BASE}?apikey=${API_KEY}&i=${id}&plot=full`;
    
    const reponse = await fetch(url);
    const donnees = await reponse.json();

    return donnees;
  } catch (erreur) {
    console.error("Erreur réseau :", erreur);
    return null;
  }
};