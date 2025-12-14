import { recupererDetailsFilm } from "./api.js";

let zoneFilm = document.getElementById("movie-details");

function recupId(){
    let param = new URLSearchParams(window.location.search);
    return param.get("id");
}

async function chargerInfos(){
    let monId = recupId();

    if(monId === null){
        zoneFilm.innerHTML = "<p>Erreur : y'a pas d'ID...</p>";
        return;
    }

    let leFilm = await recupererDetailsFilm(monId);
    const ImagePasLa = "https://placehold.co/300x450/F3F3E8/2E51BB?text=Pas+d%27image";
    let imageFinale="";
    if(leFilm === null || leFilm.Poster==="N/A"){
        imageFinale =ImagePasLa;
    }else{
        imageFinale=leFilm.Poster;
    }

    if(leFilm){
        zoneFilm.innerHTML=`
            <h1>${leFilm.Title}</h1>
            <div style="display:flex; flex-wrap:wrap;">
                <img src="${imageFinale}" style="max-width:300px; margin-right:20px; border-radius:10px;"onerror="this.onerror=null; this.src='${ImagePasLa}';">
                <div style="max-width:600px;">
                    <p><strong>Date :</strong> ${leFilm.Year}</p>
                    <p><strong>Genre :</strong> ${leFilm.Genre}</p>
                    <p><strong>Durée :</strong> ${leFilm.Runtime}</p>
                    <p><strong>Acteurs :</strong> ${leFilm.Actors}</p>
                    <p><strong>Note :</strong> ${leFilm.imdbRating}/10</p>
                    <br>
                    <h3>Résumé :</h3>
                    <p>${leFilm.Plot}</p>
                    <br>
                    <a href="search.html"><button>Retour recherche</button></a>
                </div>
            </div>
        `;
    } else {
        zoneFilm.innerHTML="<p>Impossible d'afficher le film.</p>";
    }
}

chargerInfos();