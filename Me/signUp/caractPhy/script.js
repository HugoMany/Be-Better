var btn = document.getElementById("button");
const id = document.location.search.substring(4,document.location.search.length);

btn.addEventListener('click', (event) => {
    event.preventDefault();
    const weigh = document.getElementById("weigh").value;
    const height = document.getElementById("height").value;
    console.log(weigh, height);
    let url = 'http://localhost:3000/api/user/caract/' + id + '/' + 0 + ' /' + weigh + '/' + height;
    const options = {

        method: 'GET',

        headers: {

            'Content-Type': 'application/json'

        }

    };
    try {

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
          delay(1000).then(() =>location.href = "/Me/login/");
    
          // document.location="/me/login/"
        })
        .catch(error => {
          console.error(error);
          alert('Erreur lors de l\'enregistrement de l\'utilisateur!');
        });

    } catch (error) {

        console.error(error);

    }
});