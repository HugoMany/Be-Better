const form = document.querySelector('.form-horizontal');
const registerBtn = document.querySelector('#register');

registerBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const prenom = document.querySelector('#prenom').value;
  const sexe = document.querySelector('#sexe').value;
  if (sexe === "Homme") {
    sexeN = 0;
  }
  else {
    sexeN = 1;
  }
  const email = document.querySelector('#email').value;
  const telephone = document.querySelector('#telephone').value;
  const password = document.querySelector('#password').value;
  const age = document.querySelector('#age').value;

  //http://localhost:3000/api/user/0/bgdu59/hugo@gmail.com/0650281177/helloworld/19
  const newUser = {
    sex: sexeN,
    firstName: prenom,
    email: email,
    tel: telephone,
    passw: password,
    age: age
  };
  console.log(JSON.stringify(newUser));
  const url = `http://localhost:3000/api/user/create`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newUser)
  };
  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log()
      return response.json();
    })
    .then(data => {
      console.log(data);
      createSleepTable(data["_id"]);
      createLastCoTable(data["_id"]);
      createCaract(data["_id"]);
      delay(1000).then(() =>location.href = "/Me/signUp/caractPhy/index.html?id="+data["_id"]);

      // document.location="/me/login/"
    })
    .catch(error => {
      console.error(error);
      alert('Erreur lors de l\'enregistrement de l\'utilisateur!');
    });

});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
function createSleepTable(id) {
  let url = `http://localhost:3000/api/user/sleep/${id}`
  fetch(url,
    {
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
      console.log("Sleep table created for " + id);

    })
    .catch(error => {
      console.error(error);
    });

}
function createCaract(id) {
  let url = `http://localhost:3000/api/user/caract/${id}/1/0/175/`
  fetch(url,
    {
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
      console.log("Caract table created for " + id);

    })
    .catch(error => {
      console.error(error);
    });
  }
function createLastCoTable(id) {
  let url = `http://localhost:3000/api/user/date/${id}`
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
      console.log("LastCoTable created created for " + id);

    })
    .catch(error => {
      console.error(error);
    });
}