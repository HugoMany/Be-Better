function weather(latitude,longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timeformat=unixtime&past_days=7&forecast_days=7`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      });
  }

function actuWeather(json){

}




function geoLocalisation(){
    if (navigator.geolocation) {
        console.debug('geolocalisation en cours...'); 
        navigator.geolocation.getCurrentPosition(getPosition, getError); 
     } 
     else 
        document.getElementById("error").innerHTML="La géolocalisation n'est pas disponible avec votre navigateur.";
     
     function getPosition(position) 
     { 
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        weather(latitude,longitude)
        .then((response) => {
            console.log(response);
            actuWeather(response)
          // Utilisez la réponse ici
        })
        .catch((error) => {
          console.log(error);
          console.log("Weather Error");
          // Gérez les erreurs ici
        });
        // console.log(resultat);
    } 
     
     function getError(error) 
     {
        switch(error.code) { 
        case error.PERMISSION_DENIED: 
           document.getElementById("error").innerHTML="User denied the request for Geolocation."
           break;
        default: 
           document.getElementById("error").innerHTML="Votre géolocalisation est impossible...";
        } 
     }; 
}







