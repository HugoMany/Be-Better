/*
Recupere le JSON de timetable de la personne connecter
*/
function getTimeTableFromId(id){
    const url = `http://127.0.0.1:3000/api/timetable/one/${id}`;
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
      dataRecup(data);
      return JSON.parse(data.timeTable);
    })
    .catch(error => {
      console.error(error);
    });
}
/*
Supprimmer une table
*/
function deleteTimeTableFromId(id,json){
    const url = `http://127.0.0.1:3000/api/timetable/delete/${id}`;
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
  const url = "http://127.0.0.1:3000/api/timetable/create";
  const data = {
      id: idUser,
      timeTable: json,
  };

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

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

function dataRecup(data){
  jsonTimetable = JSON.parse(data.timeTable);
 }


