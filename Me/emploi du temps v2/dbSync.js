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
      //console.log(data);
    //   goReplace(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
    
}
/*
Supprimmer une table
*/
function deleteTimeTableFromId(id,json){
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
        createTimeTable(id,json)
        return data;

    })
    .catch(error => {
      console.error(error);
    });
}

/* 
Creer une table
*/
function createTimeTable(idUser, json) {
  console.log(json);
  const url = "http://localhost:3000/api/timetable/create";
  const data = {
      id: idUser,
      timeTable: json,
  };
  console.log(data);

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, UPDATE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify(data),
  };
  console.log(options);

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


