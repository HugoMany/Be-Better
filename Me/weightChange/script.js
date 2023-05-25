var submit = document.getElementById('submit');
const id = isConnected();

function Poids() {
    var poid = document.getElementById("poids").value;
    return poid;
}


document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    var query = Poids();

    if(query<20||query>300){
        alert("Putting on the right weight");
    }
    else{
        sendWeight(query);
    }
    delay(200).then(() =>  document.location.reload() )

});

async function sendWeight(query) {
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

        alert("New updated weight.")

    } catch (error) {

        console.error(error);

    }

}
