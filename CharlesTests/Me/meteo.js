
async function func(){
   var callBackGetSuccess=function(data){
      console.log("donnees api",data)
   }
    if (navigator.geolocation) {
        console.debug('geolocalisation en cours...'); 
        navigator.geolocation.getCurrentPosition(getPosition, getError); 
     } 
     else 
        document.getElementById("error").innerHTML="La géolocalisation n'est pas disponible avec votre navigateur.";
     
      async function  getPosition(position) 
      { 
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         console.log(latitude)
         console.log(longitude)
      
      
      var url ="https://geo.api.gouv.fr/communes?lat="+latitude+"&lon="+longitude+".04883&fields=code,nom,codesPostaux,surface,population,centre,contour"
      let reponse = await fetch(url)
      reponse = (await reponse.text());
      reponse = JSON.parse(reponse)[0]

      // console.log(reponse);
      const codePostale = reponse.codesPostaux[0];
      const ville = reponse.nom;
      console.log(reponse.codesPostaux[0]);
      console.log(reponse.nom);
      url2="https://meteofrance.com/previsions-meteo-france/"+ville+"/"+codePostale

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

