async function getNutritionData(query) {
    const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + query;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd82c94cdcbmsha38743d2be2e827p1da2abjsn89958d47db3a',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function repas() {
    var aliment = document.getElementById("aliment").value;
    var poids = document.getElementById("poids").value;
    var query = poids + "g " + aliment;
    return query;
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = repas();
    console.log(query); // Afficher le journal dans la console pour tester
    getNutritionData(query);
});

