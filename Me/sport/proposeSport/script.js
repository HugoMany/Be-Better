let container = document.getElementById("container");
let cards = container.querySelectorAll(".card");
let cardNumber = cards.length - 1;
let activeCard = cards[cardNumber];
let startX, startY, currentX, currentY;

function initCard(){
    container = document.getElementById("container");

    cards = container.querySelectorAll(".card");
    cardNumber = cards.length - 1;
    activeCard = cards[cardNumber];

    startX, startY, currentX, currentY;

    activeCard.addEventListener("touchstart", touchStart);
    activeCard.addEventListener("mousedown", touchStart);
}

function choixQuestion(temps){
    if(temps==false){
        container.innerHTML='<div class="card" id="card-2">'+
        '<img src="https://source.unsplash.com/random/800x800/?natation">'+
        '<h2>Natation</h2>'+
      '</div>'+
      '<div class="card" id="card-1">'+
        '<img src="https://source.unsplash.com/random/800x800/?fitness">'+
        '<h2>Fitness</h2>'
    }
    else{
        container.innerHTML='<div class="card" id="card-2">'+
        '<img src="https://source.unsplash.com/random/800x800/?cycling">'+
        '<h2>Cycling</h2>'+
      '</div>'+
      '<div class="card" id="card-1">'+
        '<img src="https://source.unsplash.com/random/800x800/?running">'+
        '<h2>Running</h2>'
    }
    initCard();
}



function touchStart() {
    if (isTouchDevice) {
        startX = event.touches[0].clientX;
        currentX=startX;
    }
    else {
        startX = event.pageX;
        currentX=startX;
        event.preventDefault();
    }
    document.addEventListener("mousemove", Move);
    document.addEventListener("touchmove", Move);
    document.addEventListener("mouseup", touchEnd);
    document.addEventListener("touchend", touchEnd);

}

function Move() {

    if (isTouchDevice) {
        currentX = event.touches[0].clientX;
    }
    else {
        currentX = event.pageX;
    }
    if (currentX - startX < 150 && currentX - startX > -150) {
        activeCard.style.transform = "translateX(" + (currentX - startX) + "px) rotate(" + ((currentX - startX) / 10) + "deg)";
    }
}

function touchEnd() {
    document.removeEventListener("mousemove", Move);
    document.removeEventListener("touchmove", Move);

    endTransition();
}

function endTransition() {
    if ((currentX - startX) < 100 && (currentX - startX) > -100) {
        activeCard.style.transform = "translateX(" + 0 + "px) rotate(" + 0 + "deg)";
    }
    else if ((currentX - startX) >= 100) {
        activeCard.style.transform = "translateX(" + window.innerWidth + "px) rotate(" + (window.innerWidth - startX) / 10 + "deg)";
        activeCard.addEventListener("transitionend", right);
    }
    else if ((currentX - startX) <= (-100)) {
        activeCard.style.transform = "translateX(" + -window.innerWidth + "px) rotate(" + (-window.innerWidth - startX) / 10 + "deg)";
        activeCard.addEventListener("transitionend", left);
    }
}

function right(){
    activeCard.style.display="none";
    if(activeCard.children[1].outerText=="Running"){ 
        window.location.href="http://127.0.0.1:5500/Me/sport/run/indexRun.html" 
    } 
    else if(activeCard.children[1].outerText=="Natation"){ 
        window.location.href="http://127.0.0.1:5500/Me/sport/swim/indexSwim.html" 
    } 
    else if(activeCard.children[1].outerText=="Cycling"){ 
        window.location.href="http://127.0.0.1:5500/Me/sport/bike/indexBike.html" 
    }
     else if(activeCard.children[1].outerText=="Fitness"){
        window.location.href="http://127.0.0.1:5500/Me/sport/fitness/indexFitness.html" 
    }
    alert(ici)
}

function left() {
    activeCard.style.display="none";

    if (cardNumber > 0) {
        cardNumber--;
        activeCard = cards[cardNumber];
        currentX=window.innerWidth/2;
        activeCard.addEventListener("touchstart", touchStart);
        activeCard.addEventListener("mousedown", touchStart);
    }
    else {
        window.location.href="http://127.0.0.1:5500/Me/sport/indexSport.html";
    }
}

var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);





//______________________________________________________________________________________________//

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


function actuWeather(day){
    for (let i = 0; i < weatherWLocResult["hourly"]["time"].length; i++){
        const element = weatherWLocResult["hourly"]["time"][i];
        if(element==day){
            //document.getElementById(dayStr).innerHTML+="<br>"+WMOtoString(weatherWLocResult["daily"]["weathercode"][i]);
            if(WMOtoString(weatherWLocResult["hourly"]["weathercode"][i])=="Clear"||WMOtoString(weatherWLocResult["hourly"]["weathercode"][i])=="Cloud"){
                choixQuestion(true);
            }
            else{
                choixQuestion(false);
            }
        }
    }
}

function weather(latitude,longitude) {
    //
    //hourly=temperature_2m,precipitation_probability,precipitation,weathercode&timeformat=unixtime&past_days=7
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&past_days=7&timezone=auto`;
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
            weatherWLocResult=response;
            allActuWeather();
            return response;
 
        })
        .catch((error) => {
          console.log(error);
          console.log("Weather Error");
        });
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




const weatherWLoc = geoLocalisation();

function allActuWeather(){
    actuWeather(now);
}




