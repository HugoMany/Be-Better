
function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // console.log(id);
    if(getTimeTableFromId(id)){

    }
    
}

function getTimeTableFromId(id){
    
}

function createTimeTable(id,json){
    url="http://localhost:3000/api/timeTable/create"
    data = {
        id:id,
        dateOfMonday:"01/05/2023",
        timeTable:json,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    // console.log("Json send"+ JSON.stringify(data))

    fetch(url, options)
    .then(response => {
        // Vérification du code de réponse HTTP
        if (response.ok) {
            // Traitement de la réponse
            return response.json();
        }
        throw new Error("Erreur lors de l'appel à l'API : code " + response.status);
    })
    .then(json => {
        // Traitement du JSON retourné par l'API
        // console.log(json);
    })
    .catch(error => {
        console.error(error);
    });
}

window.onload = getId();
