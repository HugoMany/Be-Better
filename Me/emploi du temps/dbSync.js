/*
Initialisation de la timetable
*/
function initTimeTable(){
    let first = getId();
    console.log("1 :"+first);
    let second = getTimeTableFromId(first);
    
}

function goReplace(ourJson){
  // console.log("2 : "+ourJson["timeTable"]);
  let third = readjson(ourJson["timeTable"]);
  // console.log("3 : "+third);
}
/* 
Recuperation de l'id de l'utilisateur
*/
function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if(id=="" || urlParams==""){
        alert("Please login")
    }
    return id
}

/*
Recupere le JSON de timetable de la personne connecter
*/
function getTimeTableFromId(id){
    const url = `http://localhost:3000/api/timetable/one/${id}`;
    fetch(url, 
      {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      goReplace(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}
/*
Supprimmer une table
*/
function deleteTimeTableFromId(id){
    const url = `http://localhost:3000/api/timetable/delete/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

/* 
Creer une table
*/
function createTimeTable(idUser,json){
    url="http://localhost:3000/api/timeTable/create"
    data = {
        id:idUser,
        dateOfMonday:"01/05/2023",
        timeTable:json,
    }
    console.log(idUser);

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
        console.log(json);
    })
    .catch(error => {
        console.error(error);
    });
}

/*
Useless
*/
function modifTimeTable(id,dataJson){
  url=`http://localhost:3000/api/timetable/update/${id}`
  let idUser=id;
  let data = dataJson; 
  console.log(idUser);

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
      console.log(json);
      return true;
  })
  .catch(error => {
      console.error(error);
      return false;
  });
}
/*
Useless
*/
function updateTimeTable(id,dataJson){
  console.log(dataJson);
  createTimeTable(id,dataJson)
}

function saveTimeTable(data){
  id=getId();
  const url = `http://localhost:3000/api/timetable/delete/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
    console.log("Delete !");
  sleep(500);
  createTimeTable(id,data);
  console.log("Save !");
  
}

window.onload = initTimeTable();
