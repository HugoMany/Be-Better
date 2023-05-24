var submit = document.getElementById('submit');
const id = isConnected();

function Sleep() {
    var poid = document.getElementById("sleep").value;
    return poid;
}


document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    var query = Sleep();

    if(query<0||query>24){
        alert("rentrer un dodo correct");
    }
    else{
        sendSleep(query);
    }
});

async function sendSleep(query) {
    const url = 'http://localhost:3000/api/user/sleep/create/' + id + '/' + query;
    const options = {

        method: 'GET',

        headers: {

            'Content-Type': 'application/json'

        }

    };
    try {

        const response = await fetch(url, options);

        const result = await response.text();

        alert("New updated sleep.")
        delay(500).then(() =>document.location.reload());


    } catch (error) {

        console.error(error);

    }

}