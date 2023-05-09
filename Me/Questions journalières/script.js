let container = document.getElementById("container");
let cards = container.querySelectorAll(".card");
let activeCard = cards[cards.length - 1];
let startX, startY, currentX, currentY, deltaX, deltaY;

activeCard.addEventListener("touchstart", touchStart);
activeCard.addEventListener("mousedown", touchStart);

function touchStart(event) {
    console.log("touchstart");
    event.preventDefault();
    startX = event.clientX || event.touches[0].clientX;
    startY = event.clientY || event.touches[0].clientY;
    activeCard.style.transition = "";
    activeCard.addEventListener("touchmove", touchMove);
    activeCard.addEventListener("mousemove", touchMove);
    activeCard.addEventListener("touchend", touchEnd);
    activeCard.addEventListener("mouseup", touchEnd);
}

function touchMove(event) {
    console.log("touchMove");
    event.preventDefault();
    currentX = event.clientX || event.touches[0].clientX;
    currentY = event.clientY || event.touches[0].clientY;
    deltaX = currentX - startX;
    deltaY = currentY - startY;
    if(currentX-startX<150 && currentX-startX>-150){
        activeCard.style.transform = "translateX(" + deltaX + "px) rotate(" + (deltaX / 10) + "deg)";
    }
}

function touchEnd(event) {
    console.log("TouchEnd");
    event.preventDefault();
    activeCard.removeEventListener("touchmove", touchMove);
    activeCard.removeEventListener("mousemove", touchMove);
    activeCard.removeEventListener("touchend", touchEnd);
    activeCard.removeEventListener("mouseup", touchEnd);
    activeCard.style.transition = "transform 0.5s ease";
    /*
    if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
            activeCard.classList.add("like");
        } else {
            activeCard.classList.add("dislike");
        }
    } else {
        activeCard.style.transform = "";
    }
    */
    activeCard.addEventListener("transitionend", transitionEnd);
}

function transitionEnd() {
    console.log("transitionEnd");
    activeCard.removeEventListener("transitionend", transitionEnd);
    activeCard.style.transform = "";
    activeCard.style.transition = "";
    activeCard.classList.remove("like", "dislike");

    container.insertBefore(activeCard, container.firstChild);
    activeCard = cards[cards.length - 1];

    activeCard.addEventListener("touchstart", touchStart);
    activeCard.addEventListener("mousedown", touchStart);
}