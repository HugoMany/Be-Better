var submit = document.getElementById('submit');
const id = isConnected();

function Dodo() {
    var dodo = document.getElementById("dodo").value;
    return dodo;
}


document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    var query = Dodo();

    console.log(query);
    if(query>24){
        alert("rentrer un dodo correct");
    }
    else{
        sendDodo(query, id);
    }
});

async function sendDodo(query , id) {
    // const id = "642445267d6ced485f7eefa9"
    const url = 'http://localhost:3000/api/user/sleep/' + id + '/' + query;
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
        alert("New updated dodo.")

    } catch (error) {

        console.error(error);

    }

}