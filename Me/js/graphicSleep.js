// import Chart from 'chart.js/auto';
async function receiveSleep() {
  const url = 'http://localhost:3000/api/user/sleeps/' + isConnected() + '/';
  console.log(url);
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
          labels: json ["sleeps"].map(row=>new Date(parseInt(row.date)).toLocaleDateString('en-US', {  month: 'short', day: 'numeric', year: 'numeric' })),
       
          //[new Date(json["sleeps"][(json["sleeps"].length)-6]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),new Date(json["sleeps"][(json["sleeps"].length)-5]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),new Date(json["sleeps"][(json["sleeps"].length)-4]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),new Date(json["sleeps"][(json["sleeps"].length)-3]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),new Date (json["sleeps"][(json["sleeps"].length)-2]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),new Date(json["sleeps"][(json["sleeps"].length)-1]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),new Date(json["sleeps"][(json["sleeps"].length)]["date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })],
             datasets: [{
              label: 'kg',
              data: json ["sleeps"].map(row=>row.value),
              //[json["sleeps"][(json["sleeps"].length)-6].value,json["sleeps"][(json["sleeps"].length)-5].value,json["sleeps"][(json["sleeps"].length)-4].value,json["sleeps"][(json["sleeps"].length)-3].value,json["sleeps"][(json["sleeps"].length)-2].value,json["sleeps"][(json["sleeps"].length)-1].value,json["sleeps"][(json["sleeps"].length)].value],
              
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

const started = receiveSleep();