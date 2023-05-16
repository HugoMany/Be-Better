async function getRecipe(query, nombre) {
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
        console.log(result);
        affichage(result, nombre);

    } catch (error) {
        console.error(error);
    }
}

function recipe() {
    var query = document.getElementById("aliment").value;
    return query;
}

function affichage(json, nombre) {
    //console.log(json);
    const data = JSON.parse(json);
    let titles = "";
    let ingr = "";
    let display = ""
    document.getElementById("resultats").innerHTML;
    for (let i = 0; i < nombre; i++) {
        titles += data[i].title + ", ";
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
    const nombre = document.getElementById('nb').value;
    e.preventDefault();
    var query = recipe();
    getRecipe(query, nombre);
});