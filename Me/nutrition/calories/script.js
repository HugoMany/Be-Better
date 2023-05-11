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
    var aliment1 = document.getElementById("aliment1").value;
    var poids1 = document.getElementById("poids1").value;
    var aliment2 = document.getElementById("aliment2").value;
    var poids2 = document.getElementById("poids2").value;
    var aliment3 = document.getElementById("aliment3").value;
    var poids3 = document.getElementById("poids3").value;
    if (poids1==0){
        poids1 = 100;
    }
    if (poids2==0){
        poids2 = 100;
    }
    if (poids3==0){
        poids3 = 100;
    }
    var query = poids1 + "g " + aliment1 + ", "+ poids2 + "g " + aliment2+", " + poids3 + "g " + aliment3  ;
    return query;
}

function affichage(json) {
    console.log(json);
    const data = JSON.parse(json);
    let calories = data[0].calories;
    let sugar = data[0].sugar_g;
    let fiber = data[0].fiber_g
    let protein = data[0].protein_g
    for (let i = 1; i < data.length; i++) {
        calories += data[i].calories;
        sugar += data[i].sugar_g;
        fiber += data[i].fiber_g;
        protein += data[i].protein_g;
      }
    document.getElementById("cal").innerHTML += calories.toFixed(2);
    document.getElementById("prot").innerHTML += protein.toFixed(2);
    document.getElementById("fib").innerHTML += fiber.toFixed(2);
    document.getElementById("sug").innerHTML += sugar.toFixed(2);
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = repas();
    //console.log(query);
   getNutritionData(query);
});

