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

function dataRecup(data){
  jsonTimetable = JSON.parse(data.timeTable);
 }

/*

{"errors":{"timeTable":{"stringValue":"\"[\n  { day: '19052023', activity: [ [Object] ] },\n  { day: '16052023', activity: [ [Object], [Object] ] },\n  { day: '17052023', activity: [ [Object], [Object] ] },\n  { day: '21052023', activity: [ [Object] ] }\n]\"","valueType":"Array","kind":"string","value":[{"day":"19052023","activity":[{"activityName":"manger","activityStart":"1215","activityEnd":"1300"}]},{"day":"16052023","activity":[{"activityName":"sport","activityStart":"0800","activityEnd":"1000"},{"activityName":"sport","activityStart":"1200","activityEnd":"1400"}]},{"day":"17052023","activity":[{"activityName":"petanque","activityStart":"1800","activityEnd":"1900"},{"activityName":"jambes","activityStart":"1200","activityEnd":"1400"}]},{"day":"21052023","activity":[{"activityName":"manger","activityStart":"1200","activityEnd":"1300"}]}],"path":"timeTable","reason":null,"name":"CastError","message":"Cast to string failed for value \"[\n  { day: '19052023', activity: [ [Object] ] },\n  { day: '16052023', activity: [ [Object], [Object] ] },\n  { day: '17052023', activity: [ [Object], [Object] ] },\n  { day: '21052023', activity: [ [Object] ] }\n]\" (type Array) at path \"timeTable\""}},"_message":"timeTableModel validation failed","name":"ValidationError","message":"timeTableModel validation failed: timeTable: Cast to string failed for value \"[\n  { day: '19052023', activity: [ [Object] ] },\n  { day: '16052023', activity: [ [Object], [Object] ] },\n  { day: '17052023', activity: [ [Object], [Object] ] },\n  { day: '21052023', activity: [ [Object] ] }\n]\" (type Array) at path \"timeTable\""}

*/
