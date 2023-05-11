var submit = document.getElementById('submit');
const id = "642445267d6ced485f7eefa9"

function Poids() {
    var poid = document.getElementById("poids").value;
    return poid;
}


document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    var query = Poids();

    console.log(query); // Afficher le journal dans la console pour tester
    if(query<20||query>300){
        alert("rentrer un poid correct");
    }
    else{
        sendWeight(query);
    }
});

async function sendWeight(query) {
    const id = "642445267d6ced485f7eefa9"
    const url = 'http://localhost:3000/api/user/caract/' + id + '/' + query;

    const options = {

        method: 'GET',

        headers: {

            'Content-Type': 'application/json'

        }

    };
    try {

        const response = await fetch(url, options);

        const result = await response.text();

        console.log(result);

    } catch (error) {

        console.error(error);

    }

}

// submit.addEventListener('click', (event) => {
//     // const poid=document.getElementById("poids").value;
//     // console.log(poid);
//     poid = 33
//     const id = "642445267d6ced485f7eefa9"
//     const url = `http://localhost:3000/api/user/caract/${id}/${poid}`;
//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             alert('User enregistré avec succès!');
//         })
//         .catch(error => {
//             console.error(error);
//             alert('Erreur lors de l\'enregistrement de l\'utilisateur!');
//         });
// });