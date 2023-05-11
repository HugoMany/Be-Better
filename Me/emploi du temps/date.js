const currDate = new Date; // get current date

//On récupère le nombre correspondant au jour de la semaine
const currDayNumber = currDate.getDay();
const dayNumberPlus1 = (currDayNumber+1)%7;
const dayNumberPlus2 = (currDayNumber+2)%7
const dayNumberPlus3 = (currDayNumber+3)%7
const dayNumberPlus4 = (currDayNumber+4)%7
const dayNumberPlus5 = (currDayNumber+5)%7
const dayNumberPlus6 = (currDayNumber+6)%7

//On associe au nombre que l'on récupère le jour correspondant grâce à la fonction getNameDay que l'on a définit plus bas
const currDay=getNameDay(currDayNumber);
const dayPlus1=getNameDay(dayNumberPlus1);
const dayPlus2=getNameDay(dayNumberPlus2);
const dayPlus3=getNameDay(dayNumberPlus3);
const dayPlus4=getNameDay(dayNumberPlus4);
const dayPlus5=getNameDay(dayNumberPlus5);
const dayPlus6=getNameDay(dayNumberPlus6);

//On écrit les jours dans l'emploie du temps
document.getElementById("dDay").innerHTML+=currDay;
document.getElementById("dayPlus1").innerHTML+=dayPlus1;
document.getElementById("dayPlus2").innerHTML+=dayPlus2;
document.getElementById("dayPlus3").innerHTML+=dayPlus3;
document.getElementById("dayPlus4").innerHTML+=dayPlus4;
document.getElementById("dayPlus5").innerHTML+=dayPlus5;
document.getElementById("dayPlus6").innerHTML+=dayPlus6;


//Fonction qui va faire correspondre un nombre à son jour grâce à un switch case
function getNameDay(data){
    let returnData=null;
    switch (data) {
        case 0:
            returnData="Sunday"
            break;
        case 1:
            returnData="Monday"
            break;
        case 2:
            returnData="Tuesday"
            break;
        case 3:
            returnData="Wednesday"
            break;
        case 4:
            returnData="Thursday"
            break;
        case 5:
            returnData="Friday"
            break;
        case 6:
            returnData="Saturday"
            break;
    }
    return returnData
}


