async function getRecipe(query) {
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
        affichage(result);

    } catch (error) {
        console.error(error);
    }
}

function recipe() {
    var query = document.getElementById("aliment").value;
    return query;
}

function affichage(json) {
    //console.log(json);
    const data = JSON.parse(json);
    let titles = "";
    let ingr = "";
    let display = ""
    document.getElementById("resultats").innerHTML;
    for (let i = 0; i < 5; i++) {
        titles += data[i].title + ", ";
        ingr = data[i].ingredients;
        instr = data[i].instructions;
        display += "<br><h1>" + titles + "</h1>";
        display += "<li>";
        display += "<ul>" + ingr + "</ul>";
        display += "</li>";
        display += "<p>" + instr + "<p>";
    }
    display = display.replaceAll("|", "<br>-");
    document.getElementById("resultats").innerHTML = display;
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = recipe();
    getRecipe(query);
});