

function isLogin() {
    if (getCookie("id") == null) {
        document.location.url = document.location = "/Me/login/";
        return false
    }
    else {
        return true
    }
}


async function whatIsName() {
    const url = 'http://localhost:3000/api/user/oneuser/' + isConnected() + '/';
    const options = {

        method: 'GET',

        headers: {

            'Content-Type': 'application/json'

        }

    };
    try {

        const response = await fetch(url, options);

        const result = await response.text();
        const jsonString = result;
        const jsonRet = JSON.parse(jsonString);
        createMyCharts(jsonRet);
        console.log(jsonRet);
        // alert("New updated weight.")

    } catch (error) {

        console.error(error);

    }

}