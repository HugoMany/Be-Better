// const json2 = {

//     "_id": {

//         "$oid": "642445267d6ced485f7eefa9"

//     },

//     "sex": 0,

//     "firstName": "Hugo",

//     "email": "hugo@gmail.com",

//     "tel": "+336123456789",

//     "passw": "coucou",

//     "age": 22,

//     "__v": 0

// };
async function receiveSleep() {
    const url = 'http://localhost:3000/api/user/date/' + isConnected() + '/';
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
        
  
    } catch (error) {
  
        console.error(error);
  
    }
  
  }
function createMyCharts(json){ 
const ctx = document.getElementById('myChart');

  
new Chart(ctx, {
  
    type: 'bar',
    data: {
        labels: json ["sleeps"].map(row=>new Date(parseInt(row.date)).toLocaleDateString('en-US', {  month: 'short', day: 'numeric', year: 'numeric' })),
        datasets: [{
            label: 'evolution du poid',
            data: json ["sleeps"].map(row=>row.value),
        borderWidth: 1
        }]
  },
  options: {
    elements: { 
      
      
    borderColor: 'red',
      
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
    plugins : { legend :{display:false },},
  }
});
}