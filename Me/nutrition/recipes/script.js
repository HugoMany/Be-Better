//import { jsPDF } from "jspdf";
let display = "";
let start = 0;

async function getRecipe(query, start) {
    const url = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=' + query;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd82c94cdcbmsha38743d2be2e827p1da2abjsn89958d47db3a',
            'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        affichage(result, start);

    } catch (error) {
        console.error(error);
    }
}

function recipe() {
    var query = document.getElementById("aliment").value;
    return query;
}

function affichage(json, start) {
    const data = JSON.parse(json);
    let titles = "";
    let ingr = "";
    // let display = ""
    document.getElementById("resultats").innerHTML;
    for (let i = start; i < start + 5; i++) {
        titles = data[i].title + ", ";
        ingr = data[i].ingredients;
        instr = data[i].instructions;
        display += "<sections> <br> <h1> " + titles + " </h1> ";
        display += "<br> The ingredients :<br>";
        display += "<ul>" + ingr + "</ul>";
        display += "<br> The Recipe :<br>";
        display += "<p>" + instr + "<p> </sections>";
    }
    display = display.replaceAll("|", "<br>-");
    document.getElementById("resultats").innerHTML = display;
    // strongForNumber();
}

document.querySelector('form').addEventListener('submit', function (e) {
    var body=document.getElementById("loginBody")
    var resultats=document.getElementById("resultats");
    if(resultats!=undefined){
        resultats.remove()
    }
    resultats=document.createElement("div");
    resultats.setAttribute("id","resultats");
    body.appendChild(resultats)
    const nombre = document.getElementById('nb');
    e.preventDefault();
    var query = recipe();
    getRecipe(query, start);
});

function generatePDF() {
    var nom_fichier = prompt("Nom du fichier PDF :");
    const doc = new jsPDF();
    var txt = document.getElementById("resultats").innerText;

    var lignes = doc.splitTextToSize(txt, 180);
    var ligneIndex = 0;
    var pageHeight = doc.internal.pageSize.getHeight();

    while (ligneIndex < lignes.length) {
        if (ligneIndex !== 0) {
            doc.addPage();
        }

        var pageLignes = lignes.slice(ligneIndex, ligneIndex + pageHeight / 10);
        for (var i = 0; i < pageLignes.length; i++) {
            doc.text(pageLignes[i], 10, 10 + (i * 10));
        }

        ligneIndex += pageLignes.length;
    }

    doc.save(nom_fichier + ".pdf");
}


function showMore() {
    start += 5;
    display = "";
    var query = recipe();
    getRecipe(query, start);
}