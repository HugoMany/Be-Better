/*function init() {
    let container = document.getElementById("container");
    let cards = container.querySelectorAll(".card");
    if (cards.length == 0) {
        alert("il n'y a pas de question");
    }
    else {
        let cardNumber = cards.length - 1;
        let activeCard = cards[cardNumber];
        let startX, startY, currentX, currentY, deltaX, deltaY;
        activeCard.addEventListener("touchstart", touchStart);
        activeCard.addEventListener("mousedown", touchStart);
    }
}*/

let container = document.getElementById("container");
let cards = container.querySelectorAll(".card");
let cardNumber = cards.length - 1;
let activeCard = cards[cardNumber];

let startX, startY, currentX, currentY, deltaX, deltaY;

activeCard.addEventListener("touchstart", touchStart);
activeCard.addEventListener("mousedown", touchStart);

function newCard(theme, question) {
    let container = document.getElementById("container");
    let cards = container.querySelectorAll(".card");
    let content = container.innerHTML;
    let newContent = '<div class="card" id="card-' + (cards.length + 1) + '">' +
        '<img src="https://source.unsplash.com/random/400x400/?' + theme + '">' +
        '<h2>' + question + '</h2>' +
        '</div>';
    container.innerHTML = newContent + content;
    init();
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
        activeCard.style.transform = "translateX(" + window.innerWidth + "px) rotate(" + (window.innerWidth - startX) / 10 + "deg)";
        activeCard.addEventListener("transitionend", nextCard);
    }
    else if ((currentX - startX) <= (-100)) {
        activeCard.style.transform = "translateX(" + -window.innerWidth + "px) rotate(" + (-window.innerWidth - startX) / 10 + "deg)";
        activeCard.addEventListener("transitionend", nextCard);
    }
}

function nextCard() {
    if (cardNumber > 0) {
        cardNumber--;
        activeCard = cards[cardNumber];
        //currentX=window.innerWidth/2;
        activeCard.addEventListener("touchstart", touchStart);
        activeCard.addEventListener("mousedown", touchStart);
    }
    else {
        alert("plus de questions");
    }
}

var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

if (isTouchDevice) {
    console.log("L'utilisateur est sur un appareil tactile.");
} else {
    console.log("L'utilisateur est sur un PC ou un appareil non tactile.");
}
