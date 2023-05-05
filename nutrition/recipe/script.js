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
    } catch (error) {
        console.error(error);
    }
}

function recipe() {
    var query = document.getElementById("aliment").value;
    return query;
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = recipe();
    console.log(query); // Afficher le journal dans la console pour tester
    getRecipe(query);
});