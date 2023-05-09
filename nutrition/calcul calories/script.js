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
        affichage(result);
    } catch (error) {
        console.error(error);
    }
}

function repas() {
    var aliment = document.getElementById("aliment").value;
    var poids = document.getElementById("poids").value;
    if (poids==0){
        poids = 100;
    }
    var query = poids + "g " + aliment;
    return query;
}

function affichage(json) {
    console.log(json);
    const data = JSON.parse(json);
    let calories = data[0].calories;
    for (let i = 1; i < data.length; i++) {
        calories += data[i].calories;
        console.log(calories);
      }
    document.getElementById("resultats").innerHTML = calories.toFixed(2);
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = repas();
    //console.log(query);
   getNutritionData(query);
});

