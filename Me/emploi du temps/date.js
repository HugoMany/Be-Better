const curr = new Date; // get current date
const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
const last = first + 6; // last day is the first day + 6

const monday = new Date(curr.setDate(first)).toISOString().substring(0,10);
const tuesday = new Date(curr.setDate(first+1)).toISOString().substring(0,10);
const wednesday = new Date(curr.setDate(first+2)).toISOString().substring(0,10);
const thursday = new Date(curr.setDate(first+3)).toISOString().substring(0,10);
const friday = new Date(curr.setDate(first+4)).toISOString().substring(0,10);
const saturday = new Date(curr.setDate(first+5)).toISOString().substring(0,10);
const sunday = new Date(curr.setDate(last)).toISOString().substring(0,10);

document.getElementById("monday").innerHTML+=monday;
document.getElementById("tuesday").innerHTML+=tuesday;
document.getElementById("wednesday").innerHTML+=wednesday;
document.getElementById("thursday").innerHTML+=thursday;
document.getElementById("friday").innerHTML+=friday;
document.getElementById("saturday").innerHTML+=saturday;
document.getElementById("sunday").innerHTML+=sunday;
