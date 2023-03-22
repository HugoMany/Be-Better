
function func(){
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
        console.log(latitude)
        console.log(longitude)
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