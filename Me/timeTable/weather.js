let weatherWLocResult;

function WMOtoString(wmo) {
    if (80 <= wmo && wmo <= 99) {
        return "Rain Shower";
    } else if (70 <= wmo && wmo <= 79) {
        return "Solid Precipitations";
    } else if (60 <= wmo && wmo <= 69) {
        return "Rain";
    } else if (6 <= wmo && wmo <= 19) {
        return "Cloud";
    } else if (wmo <= 5) {
        return "Clear";
    } else {
        return "Other";
    }
}


function actuWeather(i,dayStr){
    // console.log(i);
    // console.log(dayStr);
    document.getElementById(dayStr).innerHTML=WMOtoString(weatherWLocResult["daily"]["weathercode"][i-1]);

}

function weather(latitude,longitude) {
    //
    //hourly=temperature_2m,precipitation_probability,precipitation,weathercode&timeformat=unixtime&past_days=7
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode&timezone=auto`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        let ret = response.json()        
        return ret;
      });
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
            // console.log(response);
            weatherWLocResult=response;
            allActuWeather();
            return response;
            // console.log(meteo);
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




delay(1200).then(() => geoLocalisation() );

function allActuWeather(){
    actuWeather(1,"jourMeteo1");
    actuWeather(2,"jourMeteo2");
    actuWeather(3,"jourMeteo3");
    actuWeather(4,"jourMeteo4");
    actuWeather(5,"jourMeteo5");
    actuWeather(6,"jourMeteo6");
    actuWeather(7,"jourMeteo7");

}




