// import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');
const json ={"_id":"6454e94f600c7821da35a80f","idUser":"642445267d6ced485f7eefa9","sexe":0,"allWeigh":[{"value":64,"date":"1683286351032","_id":"6454e94f600c7821da35a810"},{"value":62,"date":"1683286353221","_id":"6454e951600c7821da35a814"},{"value":62,"date":"1683286354281","_id":"6454e952600c7821da35a819"},{"value":62,"date":"1683286355115","_id":"6454e953600c7821da35a81f"},{"value":62,"date":"1683286364881","_id":"6454e95c600c7821da35a826"},{"value":62,"date":"1683286365663","_id":"6454e95d600c7821da35a82e"}],"height":178,"__v":5};   


new Chart(ctx, {
  
    type: 'line',
    data: {
        labels: json ["allWeigh"].map(row=>new Date(parseInt(row.date)).toLocaleDateString('en-US', {  month: 'short', day: 'numeric', year: 'numeric' })),
        datasets: [{
            label: 'evolution du poid',
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
        beginAtZero: true,
      }
    },
    plugins : { legend :{display:false },},
  }
});
