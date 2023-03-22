// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

var btn = document.getElementById("register");

        btn.onclick = function () {
            const nom = document.getElementById("nom").innerHTML;
            const prenom = document.getElementById("prenom").innerHTML;
            const username = document.getElementById("username").innerHTML;
            const email = document.getElementById("email").innerHTML;
            const telephone = document.getElementById("telephone").innerHTML;
        }