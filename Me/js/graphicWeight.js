
// import Chart from 'chart.js/auto';
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
      createMyCharts(jsonRet);
      console.log(jsonRet);
      // alert("New updated weight.")

  } catch (error) {

      console.error(error);

  }

}


function createMyCharts(json){
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    
      type: 'line',
      data: {
          labels: json ["allWeigh"].map(row=>new Date(parseInt(row.date)).toLocaleDateString('en-US', {  month: 'short', day: 'numeric', year: 'numeric' })),
          datasets: [{
              label: 'kg',
              data: json ["allWeigh"].map(row=>row.value),
          borderWidth: 1
          }]
    },
    options: {
      elements: { 
        line: {
          easing: 'linear',
          borderColor: 'orangeRed',
          borderJoinStyle : 'miter',
        },
        point: {
          borderColor: 'red',
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        }
      },
      plugins : { legend :{display:false },},
    }
  });
  
}

// const started = receiveWeight();