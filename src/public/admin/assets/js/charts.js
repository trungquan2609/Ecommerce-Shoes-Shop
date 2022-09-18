// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ];
  
//   var data = {
//   labels: labels,
//   datasets: [{
//      label: 'My First dataset',
//      backgroundColor: 'rgb(255, 99, 132)',
//      borderColor: 'rgb(255, 99, 132)',
//      data: [0, 10, 5, 2, 20, 30, 1000],
//     }]
//   };

// const config = {
//   data: data,
//   type: 'line',
//   options: {
//     plugins: {
//       responsive: true,
//       legend: {
//       position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart'
//       }
//     }
//   },
//   };
// const myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );

var dataApi = '/api/dataTotal';
var dataByMonthApi = '/api/dataTotal/databymonth';


function getDataTotal(callback) {
  fetch(dataApi)
  .then(response => response.json())
  .then(dataOutput => {
    console.log(dataOutput)
  })
  .catch(err => console.error(err));
}

async function getDataByMonth(labels, data, config, dataByMonth) {
  var dataByMonth = await fetch(dataByMonthApi)
  .then(response => response.json())
  .then(rs => {
    const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  var dataTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i in rs) {
    dataTable[(rs[i]._id.month-1)] = rs[i].total
  }
  
  var data = {
  labels: labels,
  datasets: [{
     label: 'Doanh thu',
     backgroundColor: 'rgb(255, 99, 132)',
     borderColor: 'rgb(255, 99, 132)',
     data: dataTable,
    }]
  };

const config = {
  data: data,
  type: 'line',
  options: {
    plugins: {
      responsive: true,
      legend: {
      position: 'top',
      },
      title: {
        display: true,
        text: ''
      }
    }
  },
  };
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);})
  // for ( let i = 0; i<12; i++ ) {

  // }
  return dataByMonth
}
getDataByMonth()





