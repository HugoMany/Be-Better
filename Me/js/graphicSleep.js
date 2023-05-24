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

const id = isConnected()
console.log(id)
// async function receiveSleep() {
//     url='http://localhost:3000/api/user/sleep/' + id + '/getSleep';
//     console.log(isConnected());
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
//         console.log(json)
//         createMyCharts2(jsonRet);
//         console.log(jsonRet);

//     } catch (error) {

//         console.error(error);

//     }



// }

async function receiveSleep(id) {
  const url = 'http://localhost:3000/api/user/sleep/getSleep/' + id;
  const options = {

    method: 'GET',

    headers: {

      'Content-Type': 'application/json'

    }

  };
  try {

    const response = await fetch(url, options);

    const result = await response.text();
    console.log(result);
    
    createMyCharts2(JSON.parse(result));

    // const jsonString = result;
    // const jsonRet = JSON.parse(jsonString);
    // console.log(jsonString);
    // createMyCharts2(jsonRet);
    // console.log(jsonRet);


  } catch (error) {

    console.log(error);

  }

}
function createMyCharts2(json) {
  const ctx = document.getElementById('myChart');


  new Chart(ctx, {

    type: 'bar',
    data: {
      labels: json["sleeps"].map(row => new Date(parseInt(row.date)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })),
      datasets: [{
        label: 'evolution du sommeil',
        data: json["sleeps"].map(row => row.value),
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
      plugins: { legend: { display: false }, },
    }
  });
}

const started = receiveSleep(id);