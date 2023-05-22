

function isLogin() {
    if (getCookie("id") == "") {
        // document.location.url = document.location = "/Me/login/";
        document.location="/Me/login/";

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
        // console.log(jsonRet);
        document.getElementById("name").innerHTML+=" "+jsonRet["firstName"]+" welcome back to BeBetter";
        // alert("New updated weight.")

    } catch (error) {

        console.error(error);

    }

}
function notify(){
    delay(5000).then(() =>
    {
        document.getElementById("notif").style["overflow"]="hidden";
        document.getElementById("notif").children[0].style["color"]="var(--BBDblue)" 
    }
    );

}
const connected = isLogin();

delay(200).then(() =>
    {
        const helloname = whatIsName();
        const notifyStart=notify(); 
    });

