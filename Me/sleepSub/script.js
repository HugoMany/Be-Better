var submit = document.getElementById('submit');
const id = isConnected();

function Sleep() {
    var poid = document.getElementById("sleep").value;
    return poid;
}


document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    var query = Sleep();
    console.log(query);

    console.log(query); // Afficher le journal dans la console pour tester
    if(query<0||query>24){
        alert("rentrer un dodo correct");
    }
    else{
        sendSleep(query);
    }
});

async function sendSleep(query) {
    console.log(query);
    const url = 'http://localhost:3000/api/user/sleep/create/' + id + '/' + query;
    console.log(url);
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
        alert("New updated sleep.")
        delay(500).then(() =>document.location.reload());


    } catch (error) {

        console.error(error);

    }

}