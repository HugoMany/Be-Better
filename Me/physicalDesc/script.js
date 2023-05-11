// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var btn = document.getElementById("register");

btn.onclick = function () {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("telephone").value;
    let password = document.getElementById("password").value;
    data = [];
    data.push({ "nom": nom, "prenom": prenom, "username": username, "email": email, "telephone": telephone, "password": password });
    data = JSON.stringify(data);
    console.log(data);
    modal.style.display = "none";
}