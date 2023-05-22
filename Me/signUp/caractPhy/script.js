var btn = document.getElementById("button");
const id = isConnected();

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

        const response = fetch(url, options);

        const result = response.text;

        console.log(result);
        alert("Create poids et taille")

    } catch (error) {

        console.error(error);

    }
});