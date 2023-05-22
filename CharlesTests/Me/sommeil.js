const json2 ={

      "_id": {
    
        "$oid": "642445267d6ced485f7eefa9"
    
      },
    
      "sex": 0,
    
      "firstName": "Hugo",
    
      "email": "hugo@gmail.com",
    
      "tel": "+336123456789",
    
      "passw": "coucou",
    
      "age": 22,
    
      "__v": 0
    
    };

    const toMilliseconds = (hrs,min) => ((hrs*60*60+min*60)*1000);
    const toHour =(mills) => ((new Date (mills)).getUTCHours()+':'+ (new Date(mills)).getUTCMinutes());

function whenToSleep(){
    
    const wakeTime = document.getElementById('appt').value;
    

    const time = toMilliseconds(wakeTime[0]+wakeTime[1], wakeTime[3]+wakeTime[4]);
    // console.log(time)
    let sleepDuration
    
    if (json2["age"]<=11 ){ 
         sleepDuration=toMilliseconds(10,00);
        //  console.log(sleepDuration)
    }
    else if ((json2["age"]>11) && (json2["age"]<=19 )){ 
        sleepDuration=toMilliseconds(9,00);
        // console.log(sleepDuration)
    }
    else { //if (json2["age"]>20 )
        sleepDuration=toMilliseconds(8,00);
        // console.log(sleepDuration)
    }
        //  console.log(new Date(time))
        //  console.log(toHour(time))
        //  console.log(new Date(time-sleepDuration))
     
     document.getElementById("wake").innerHTML = "You should sleep at" + (toHour(time-sleepDuration));
}
function whenToWake(){
    
    const wakeTime = document.getElementById('appt2').value;
    

    const time = toMilliseconds(wakeTime[0]+wakeTime[1], wakeTime[3]+wakeTime[4]);
    // console.log(time)
    let sleepDuration
    
    if (json2["age"]<=11 ){ 
         sleepDuration=toMilliseconds(10,00);
        //  console.log(sleepDuration)
    }
    else if ((json2["age"]>11) && (json2["age"]<=19 )){ 
        sleepDuration=toMilliseconds(9,00);
        // console.log(sleepDuration)
    }
    else { //if (json2["age"]>20 )
        sleepDuration=toMilliseconds(8,00);
        // console.log(sleepDuration)
    }
        //  console.log(new Date(time))
        //  console.log(toHour(time))
        //  console.log(new Date(time-sleepDuration))
     
     document.getElementById("wake").innerHTML = "You should wake up at" + (toHour(time+sleepDuration));
}


//console.log(document.getElementById('appt'))