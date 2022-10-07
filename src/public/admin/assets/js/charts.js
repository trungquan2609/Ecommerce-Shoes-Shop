var dataApi = '/api/dataTotal';
var dataByMonthApi = '/api/dataTotal/databymonth';
var myChart = null

function getDataTotal(callback) {
  fetch(dataApi)
  .then(response => response.json())
  .then(dataOutput => {
  })
  .catch(err => console.error(err));
}

function getDataByMonth(labels, data, config, dataByMonth) {
  fetch(dataByMonthApi)
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
  if (myChart != null) {
    myChart.destroy()
  }
myChart = new Chart(
  document.getElementById('myChart'),
  config
);
})
}
getDataByMonth()

$( function() {
  var dateFormat = "mm/dd/yy",
    from = $( "#from" )
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
      }),
    to = $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3
    })
    .on( "change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
    });

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }
} );


function getData() {
  var dateFrom = document.getElementById("from").value.replaceAll('/','-');
  var dateTo = document.getElementById("to").value.replaceAll('/','-');
  var api
  api = `/api/dataTotal?from=${dateFrom}&to=${dateTo}`
  fetch(api)
    .then(response => response.json())
    .then(rs => {
      var rsData = rs.sort((a,b) => new Date(a._id.year, a._id.month, a._id.day) - new Date(b._id.year, b._id.month, b._id.day))
      labels = [];
      for( var i in rsData) {
        labels.push(`${rsData[i]._id.day}-${rsData[i]._id.month}-${rsData[i]._id.year}`)
      }
      var dataTable = [];
      for (var i in rsData) {
        dataTable.push(rsData[i].total) 
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
  
      var config = {
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
        if (myChart != null) {
          myChart.destroy()
        }
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
    })
}


