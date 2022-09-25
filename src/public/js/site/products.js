var currentLink = window.location.pathname
var search = window.location.search.replace('?', '&')
$('#paging').pagination({
  dataSource: `/api${currentLink}?page=1${search}`,
  locator: 'data',
  totalNumberLocator: function(response) {
      // you can return totalNumber by analyzing response content
      return response.total[0]?.SKU;
  },
  pageSize: 6,
  afterPageOnClick: function(event, pageNumber) {
    loadPage(pageNumber)
  },
  afterNextOnClick: function(event, pageNumber) {
    loadPage(pageNumber)
  },
  afterPreviousOnClick : function(event, pageNumber) {
    loadPage(pageNumber)
  }


})


function loadPage(page) {
  $('#products').html('')
  $.ajax({
    url:`/api${currentLink}?page=${page}${search}`,
    type: 'GET',
  })
  .then(rs => {
    for (let i in rs.data) {
      var element = rs.data[i];
      render(element)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

loadPage(1)

function render(element) {
  if (element._id.salePrice) {
    var item = $(`<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
      <a href="/product/${element._id.SKU}" class="product__new-item">
        <div class="card" style="width: 100%">
          <div>
            <img class="card-img-top img_size"  src="/img/product/${element._id.productImage}" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title custom__name-product">
              ${element._id.name}
            </h5>
            <div class="product__price">
                <p class="card-text price-color product__price-old">${priceFormat(element._id.price)} đ</p>
                <p class="card-text price-color product__price-new">${priceFormat(element._id.salePrice)} đ</p>
            </div>
            <div class="home-product-item__action">
            </div>
              <div class="sale-off">
                <span class="sale-off-percent">${salePercent(element._id.salePrice, element._id.price)}%</span>
                <span class="sale-off-label">GIẢM</span>
              </div>
          </div>
        </div>
      </a>
    </div>`)
    } else {
      var item = $(`<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
      <a href="/product/${element._id.SKU}" class="product__new-item">
        <div class="card" style="width: 100%">
          <div>
            <img class="card-img-top img_size"  src="/img/product/${element._id.productImage}" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title custom__name-product">
              ${element._id.name}
            </h5>
            <div class="product__price">
                <p class="card-text price-color product__price-old"></p>
                <p class="card-text price-color product__price-new">${priceFormat(element._id.price)} đ</p>
            </div>
            <div class="home-product-item__action">
            </div>
          </div>
        </div>
      </a>
    </div>`)
  }
  $('#products').append(item)

}

function priceFormat(price) {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function salePercent(a, b) {
  return Math.round(100 - (a / b * 100))
}

function titleSort() {
  var title = $('#dropdownMenuButton')
  switch (search.slice(1, 13)) {
    case 'sn=price&s=1':
      title.html('Giá: Tăng dần');
      break;
    case 'sn=price&s=-':
      title.html('Giá: giảm dần');
      break;
    case 'sn=name&s=1':
      title.html('Tên A->Z');
      break;
    case 'sn=name&s=-1':
      title.html('Tên Z->A');
      break;
  }
}

titleSort()

function priceFilter() {
  var priceFilter = document.querySelectorAll('input[type=radio]');
  for (var i in priceFilter) {
    if(priceFilter[i].checked) {
      var q = window.location.search
      if ( q.search('gt') == -1 || q.search('lt') == -1 ) {
        window.location.search = window.location.search + '&' + `gt=${parseInt(priceFilter[i].value) == 9999000000 ? 4000000 : parseInt(priceFilter[i].value) - 1000000}&lt=${parseInt(priceFilter[i].value)}`;
      }
      if ( q.search('gt') != -1 || q.search('lt') != -1 ) {
        window.location.search = `${window.location.search.slice(1, q.search('gt'))}gt=${parseInt(priceFilter[i].value) == 9999000000 ? 4000000 : parseInt(priceFilter[i].value) - 1000000}&lt=${parseInt(priceFilter[i].value)}`
      }
    }
  }
}

function checkedPriceFilter() {
  var priceFilter = document.querySelectorAll('input[type=radio]');
  var q = window.location.search;
  switch ( q.slice(q.search('gt'))) {
    case 'gt=0&lt=1000000':
      document.getElementById('kg1').checked = true;
      break;
    case 'gt=1000000&lt=2000000':
      document.getElementById('kg2').checked = true;
      break;
    case 'gt=2000000&lt=3000000':
      document.getElementById('kg3').checked = true;
      break;
    case 'gt=3000000&lt=4000000':
      document.getElementById('kg4').checked = true;
      break;
    case 'gt=4000000&lt=9999000000':
      document.getElementById('kg5').checked = true;
      break;
  }
}

checkedPriceFilter()

function checkedBrandFilter() {
  var brandFilter = document.querySelectorAll('.checkthuonghieu')
  var brandFilter2 = document.querySelectorAll('.checkBrandFilter')
  var q = window.location.pathname
  switch (q) {
    case '/product/sort/62b727023c79cdf5b7e32721':
      document.getElementById('th1').checked = true;
      break;
    case '/product/sort/62bc672ee27b9d2c8072bdc2':
      document.getElementById('th2').checked = true;
      break;
    case '/product/sort/62bc67a3e27b9d2c8072bdc6':
      document.getElementById('th3').checked = true;
      break;
    case '/product/sort/62bc67bfe27b9d2c8072bdc8':
      document.getElementById('th4').checked = true;
      break;
    case '/product/sort/62bc6760e27b9d2c8072bdc3':
      document.getElementById('th5').checked = true;
      break;
    case '/product/sort/62bc6784e27b9d2c8072bdc5':
      document.getElementById('th6').checked = true;
      break;
    case '/product/sort/62bc67b4e27b9d2c8072bdc7':
      document.getElementById('th7').checked = true;
      break;
    case '/product/sort/62bc677ae27b9d2c8072bdc4':
      document.getElementById('th8').checked = true;
      break;
  }
  console.log(brandFilter)
  if (window.location.pathname == '/product') {
    brandFilter2.classList.toggle('hidden')
  }
  for(var i in brandFilter) {
    if(brandFilter[i].checked){
      brandFilter2[i].classList.remove('hidden')
    } else {
      brandFilter2[i]?.classList?.add('hidden')
    }
  }
}

checkedBrandFilter()

function checkedBrandFilterOnClick(brand) {
  var brandFilter = document.querySelectorAll('.checkthuonghieu');
  for(var i in brandFilter) {
    if(brandFilter[i].checked) {
      return window.location =  `/product/sort/${brand}`
    }else {
      window.location =  `/product`
    }

  }
}