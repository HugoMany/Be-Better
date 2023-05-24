async function receiveLastNight() {
    const url = 'http://localhost:3000/api/user/sleeps/' + isConnected();
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
        printCartOnNight(jsonRet);
        // alert("New updated weight.")
  
    } catch (error) {
  
        console.error(error);
  
    }
  
  }

function printCartOnNight(json){
    let elementLastNight=document.getElementById("lastNightP");
    let lastNight=json["sleeps"][json["sleeps"].length - 1]["value"];
    elementLastNight.innerHTML+= " <b>"+lastNight+" hours</b>";
}

delay(200).then(() =>
    {
        receiveLastNight();
    });