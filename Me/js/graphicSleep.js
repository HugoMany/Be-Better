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
receiveSleep()
const id = isConnected()
async function receiveSleep() {
    url='http://localhost:3000/api/user/getSleep/' + id;
    console.log(isConnected());
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
        console.log(json)
        createMyCharts2(jsonRet);
        console.log(jsonRet);
        // alert("New updated weight.")
  
    } catch (error) {
  
        console.error(error);
  
    }
  


}

// const started  =receiveSleep();
// async function receiveSleep() {
//     const url = 'http://localhost:3000/api/user/sleep/' + isConnected() + '/';
//     const options = {
  
//         method: 'GET',
  
//         headers: {
  
//             'Content-Type': 'application/json'
  
//         }
  
//     };
//     try {
  
//         const response = await fetch(url, options);
  
//         const result = await response.text();
//         const jsonString = result;
//         const jsonRet = JSON.parse(jsonString);
//         createMyCharts(jsonRet);
//         console.log(jsonRet);
        
  
//     } catch (error) {
  
//         console.error(error);
  
//     }
  
//   }
function createMyCharts2(json){ 
const ctx = document.getElementById('myChart');

console.log(json)  
new Chart(ctx, {
  
    type: 'bar',
    data: {
        labels: json ["sleeps"].map(row=>new Date(parseInt(row.date)).toLocaleDateString('en-US', {  month: 'short', day: 'numeric', year: 'numeric' })),
        datasets: [{
            label: 'evolution du sommeil',
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