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

const form = document.querySelector('.form-horizontal');
const registerBtn = document.querySelector('#register');

registerBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const prenom = document.querySelector('#prenom').value;
  const sexe = document.querySelector('#sexe').value;
  if(sexe==="homme"){
    sexeN=0;
  }
  else{
    sexeN=1;
  }
  const email = document.querySelector('#email').value;
  const telephone = document.querySelector('#telephone').value;
  const password = document.querySelector('#password').value;
  const age = document.querySelector('#age').value;

  //http://localhost:3000/api/user/0/bgdu59/hugo@gmail.com/0650281177/helloworld/19

  const url = `http://localhost:3000/api/user/${sexeN}/${prenom}/${email}/${telephone}/${password}/${age}`;
  fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert('User enregistré avec succès!');
      modal.style.display = "none";

    })
    .catch(error => {
      console.error(error);
      alert('Erreur lors de l\'enregistrement de l\'utilisateur!');
    });
});
