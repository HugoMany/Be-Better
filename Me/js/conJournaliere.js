// const id = isConnected();

async function sendCo(id) {
    const date = date.now();
    // const id = "642445267d6ced485f7eefa9"
    const url = 'http://localhost:3000/api/user/date/' + id + '/' + date;
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
        alert("New updated Co.")

    } catch (error) {

        console.error(error);

    }

}

// sendCo(id);