const api = '/api/statistics'
$('#sandbox-container .input-daterange').datepicker({
    autoclose: true,
    language: "vi",
    todayHighlight: true
});

function renderList(element) {
    var item = `<tr class="odd name">
    <td>${element.item.SKU}</td>
    <td>${element.item.productName}</td>
    <td>${element.item.size}</td>
    <td>${element.item.material}</td>
    <td>${element.item.sexual}</td>
    <td>${element.qty}</td>
    <td>${element.createdAt}</td>
    </tr>`
    $('#list').append(item)
}

var material
var materialList = document.querySelectorAll('.material')
for ( var i of materialList) {
    i.addEventListener('click', function (e) {
        material = e.target.innerHTML
        getList()
    })
}

var sexual
var sexualList = document.querySelectorAll('.sexual')
for ( var i of sexualList) {
    i.addEventListener('click', function (e) {
        sexual = e.target.innerHTML
        console.log(sexual )
        getList()
    })
}





// function getVar() {
//     console.log(material, sexual)
// }
// console.log(materialList)
function getList() {
    var dateFrom = document.getElementById("from").value.replaceAll('/','-');
    var dateTo = document.getElementById("to").value.replaceAll('/','-');
    $('#list').html('')
    
    fetch(`${api}?material=${material}&sexual=${sexual}&from=${dateFrom}&to=${dateTo}`)
    .then(response => response.json())
    .then(rs => {
        // console.log(rs)
        for (var i in rs) {
            renderList(rs[i])
        }
    })
}

getList()