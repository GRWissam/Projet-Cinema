import { rechercherFilms } from "./api.js";

let barreDeRecherche=document.getElementById("search-input");
let divResultats=document.getElementById("results-container");
let boutonPlus=document.getElementById("btn-charger-plus");
let monTimer;

let pageActuelle=1;
let rechercheActuelle="";

function afficherUnFilm(leFilm){
    let divFilm=document.createElement("div");
    divFilm.classList.add("movie-card");
    
    let monImage="";
    if(leFilm.Poster==="N/A"){
        monImage="https://placehold.co/200x300?text=Pas+d'image";
    }else{
        monImage=leFilm.Poster;
    }
    divFilm.innerHTML=`
        <img src="${monImage}" style="width: 100%; border-radius: 10px;">
        <h3>${leFilm.Title}</h3>
        <p>${leFilm.Year}</p>
        <a href="movie.html?id=${leFilm.imdbID}">Voir infos</a>
    `;
    divResultats.appendChild(divFilm);
}

function lancerLaRecherche(nouvelleRecherche){
    let texteTape=barreDeRecherche.value;
    if(nouvelleRecherche===true){
        pageActuelle=1;
        divResultats.innerHTML="";
        rechercheActuelle=texteTape;
    }

    if(rechercheActuelle.length<3){
        divResultats.innerHTML="";
        boutonPlus.style.display="none";
        return;
    }
    if(pageActuelle===1){
         divResultats.innerHTML="<p>Chargement...</p>";
    }
    rechercherFilms(rechercheActuelle, pageActuelle).then(function(mesFilms){
        if(pageActuelle===1){
            divResultats.innerHTML="";
        }
        
        if(mesFilms.length>0){
            mesFilms.forEach(function(film){
                afficherUnFilm(film);
            });
            boutonPlus.style.display="block";
        }else{
            if(pageActuelle===1){
                divResultats.innerHTML="<p>Pas de film trouvé.</p>";
            }
            boutonPlus.style.display="none";
        }
    });
}

barreDeRecherche.addEventListener("input",function(){
    clearTimeout(monTimer);
    boutonPlus.style.display="none";
    monTimer=setTimeout(function(){
        lancerLaRecherche(true); 
    },500);
});

boutonPlus.addEventListener("click", function(){
    pageActuelle = pageActuelle + 1;
    lancerLaRecherche(false);
});