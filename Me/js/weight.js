async function receiveWeight() {
    const url = 'http://localhost:3000/api/user/caract/' + isConnected() + '/';
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
        printCartOnHome(jsonRet);
        // alert("New updated weight.")
  
    } catch (error) {
  
        console.error(error);
  
    }
  
  }

function printCartOnHome(json){
    let elementWeight=document.getElementById("poid");
    let elementBMI=document.getElementById("BMI");
    let weight=json["allWeigh"][json["allWeigh"].length - 1]["value"];
    let height=json["height"];
    elementWeight.innerHTML+= " <b>"+weight+" kg</b>";
    let bmi = (weight)/(((height/100))^2)
    bmi = Math.round(bmi);
    elementBMI.innerHTML+= " <b>"+bmi+"</b>";
    // console.log(json);
}

delay(200).then(() =>
    {
        receiveWeight();
    });