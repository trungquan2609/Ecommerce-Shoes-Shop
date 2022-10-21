const api = '/api/statistics'
var clearBtn = document.getElementById('clear-btn')

clearBtn.addEventListener('click', function () {
    document.getElementById("from").value = ''
    document.getElementById("to").value = ''
    sexual = undefined
    material = undefined
    document.querySelector('button[name="material"').innerHTML = 'Lọc chất liệu'
    document.querySelector('button[name="sexual"').innerHTML = 'Lọc loại giày'
    getList()
})

$('#sandbox-container .input-daterange').datepicker({
    autoclose: true,
    language: "vi",
    todayHighlight: true,
    orientation: "bottom auto"
});

var dateFrom = document.getElementById("from").value.replaceAll('/','-');
var dateTo = document.getElementById("to").value.replaceAll('/','-');

var material
var materialList = document.querySelectorAll('.material')
for ( var i of materialList) {
    i.addEventListener('click', function (e) {
        material = e.target.innerHTML
        document.querySelector('button[name="material"').innerHTML = material
        getList()
    })
}

var sexual
var sexualList = document.querySelectorAll('.sexual')
for ( var i of sexualList) {
    i.addEventListener('click', function (e) {
        sexual = e.target.innerHTML
        document.querySelector('button[name="sexual"').innerHTML = sexual
        getList()
    })
}

function getList() {
    var dateFrom = document.getElementById("from").value.replaceAll('/','-');
    var dateTo = document.getElementById("to").value.replaceAll('/','-');
    fetch(`${api}?material=${material}&sexual=${sexual}&from=${dateFrom}&to=${dateTo}`)
    .then(response => response.json())
    .then(rs => {
        var data = []
        for (var i in rs) {
            data.push({
                'SKU': rs[i].item.SKU,
                'Tên sản phẩm': rs[i].item.productName,
                'Size': rs[i].item.size,
                'Chất liệu': rs[i].item.material ? rs[i].item.material : null,
                'Loại giày': rs[i].item.sexual ? rs[i].item.sexual : null,
                'Số lượng bán': rs[i].qty,
            })
        }
        var table = $('#table1').DataTable({
            retrieve: true,
            "columns": [
                {'data':'SKU'},
                {'data':'Tên sản phẩm'},
                {'data':'Size'},
                {'data':'Chất liệu'},
                {'data':'Loại giày'},
                {'data':'Số lượng bán'},
            ]
        });
        table.clear().draw();
        table.rows.add(data).draw()
    })
}

getList()
