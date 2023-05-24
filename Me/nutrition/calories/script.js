let container = document.getElementById("container");
let cards = container.querySelectorAll(".card");
let cardNumber = cards.length - 1;
let activeCard = cards[cardNumber];
let startX, startY, currentX, currentY;
//
let morning = document.getElementById("morning");
let noon = document.getElementById("noon");
let evening = document.getElementById("evening");
let result = document.getElementById("result");
var query;
//
var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

if (isTouchDevice) {
    console.log("L'utilisateur est sur un appareil tactile.");
} else {
    console.log("L'utilisateur est sur un PC ou un appareil non tactile.");
}
//
function initcard() {
    activeCard.addEventListener("touchstart", touchStart);
    activeCard.addEventListener("mousedown", touchStart);
}

function touchStart() {
    if (isTouchDevice) {
        startX = event.touches[0].clientX;
        currentX = startX;
    }
    else {
        startX = event.pageX;
        currentX = startX;
        event.preventDefault();
    }
    //startX = event.pageX;
    document.addEventListener("mousemove", Move);
    document.addEventListener("touchmove", Move);
    document.addEventListener("mouseup", touchEnd);
    document.addEventListener("touchend", touchEnd);
}

function Move() {

    //event.preventDefault();
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
        if(cardNumber%2==1){
            activeCard.style.transform = "translateX(" + window.innerWidth + "px) rotate(" + (window.innerWidth - startX) / 10 + "deg)";
            activeCard.addEventListener("transitionend", right);
        }
        else{
            if(activeCard.children[0].children[2].value=='' || activeCard.children[0].children[5].value == ''){
                activeCard.style.transform = "translateX(" + 0 + "px) rotate(" + 0 + "deg)";
            }
            else{
                activeCard.style.transform = "translateX(" + window.innerWidth + "px) rotate(" + (window.innerWidth - startX) / 10 + "deg)";
                query+= activeCard.children[0].children[5].value + "g "+activeCard.children[0].children[2].value+", "
                activeCard.addEventListener("transitionend", right);  
            }
        }
        
    }
    else if ((currentX - startX) <= (-100)) {
        activeCard.style.transform = "translateX(" + -window.innerWidth + "px) rotate(" + (-window.innerWidth - startX) / 10 + "deg)";
        activeCard.addEventListener("transitionend", left);
    }
}

function right(){
    activeCard.style.display="none";
    nextCard();
}
function left(){
    activeCard.style.display="none";
    if(cardNumber%2==0){
        nextCard();
    }
    else {
        cardNumber--;
        activeCard = cards[cardNumber];
        activeCard.style.display= "none";
        nextCard();
    }
}
function nextCard() {
    if (cardNumber > 0) {
        cardNumber--;
        activeCard = cards[cardNumber];
        currentX=window.innerWidth/2;
        activeCard.addEventListener("touchstart", touchStart);
        activeCard.addEventListener("mousedown", touchStart);
    }
    else {
        calculCalorie();
        //alert("plus de questions");
    }
}
//===========================================================================================
async function getNutritionData(query) {
    const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + query;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd82c94cdcbmsha38743d2be2e827p1da2abjsn89958d47db3a',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        affichage(result);
    } catch (error) {
        console.error(error);
    }
}

function repas() {
    /*
    var aliment1 = document.getElementById("aliment1").value;
    var poids1 = document.getElementById("poids1").value;
    var aliment2 = document.getElementById("aliment2").value;
    var poids2 = document.getElementById("poids2").value;
    var aliment3 = document.getElementById("aliment3").value;
    var poids3 = document.getElementById("poids3").value;
    if (poids1 == 0) {
        poids1 = 100;
    }
    if (poids2 == 0) {
        poids2 = 100;
    }
    if (poids3 == 0) {
        poids3 = 100;
    }*/
    //var query = poids1 + "g " + aliment1 + ", " + poids2 + "g " + aliment2 + ", " + poids3 + "g " + aliment3;
    if(query!=undefined){
        query=query.substring(0, query.length - 2);
        return query;        
    }

}

function affichage(json) {
    const data = JSON.parse(json);
    let calories = data[0].calories;
    let sugar = data[0].sugar_g;
    let fiber = data[0].fiber_g
    let protein = data[0].protein_g
    for (let i = 1; i < data.length; i++) {
        calories += data[i].calories;
        sugar += data[i].sugar_g;
        fiber += data[i].fiber_g;
        protein += data[i].protein_g;
    }
    document.getElementById("cal").innerHTML += calories.toFixed(2);
    document.getElementById("prot").innerHTML += protein.toFixed(2);
    document.getElementById("fib").innerHTML += fiber.toFixed(2);
    document.getElementById("sug").innerHTML += sugar.toFixed(2);
}

function calculCalorie(){
    event.preventDefault();
    var query = repas();
    getNutritionData(query);
    id = isConnected()
    getAge(id)
}

async function getApport(id, age) {
    const url = 'http://localhost:3000/api/user/caract/' + id;
    const options = {

        method: 'GET',

        headers: {

            'Content-Type': 'application/json'

        }

    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        var json = JSON.parse(result);
        var size_ = json["allWeigh"].length;
        var poids_ = json["allWeigh"][size_ - 1]["value"];
        var taille_ = json["height"];
        var sexe_ = json["sexe"];
        if (sexe_ == 0) {
            var apport = 10 * poids_ + 6.25 * taille_ - 5 * age + 5;
        }
        else {
            var apport = 10 * poids_ + 6.25 * taille_ - 5 * age - 161;
        }

        document.getElementById("apport_neccesaire").innerHTML += Math.round(apport * 1.3);
    } catch (error) {
        console.error(error);
    }
}

async function getAge(id) {
    const url = 'http://localhost:3000/api/user/oneuser/' + id;
    const options = {

        method: 'GET',

        headers: {

            'Content-Type': 'application/json'

        }

    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        var json = JSON.parse(result);
        var age = json["age"];
        getApport(id, age);
    } catch (error) {
        console.error(error);
    }
}

window.onload = initcard();
