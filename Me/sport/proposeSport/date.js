const curr = new Date(); // get current date

const today = new Date(curr).toISOString().substring(0,10);
const now= today+"T"+curr.getHours()+":00";


