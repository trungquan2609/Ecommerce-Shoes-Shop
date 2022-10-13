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
              <div class="home-product-item__rating">
              ${renderStar(element._id.rate)?renderStar(element._id.rate):renderStar(0)}
              </div>
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
            <div class="home-product-item__rating">
                  ${renderStar(element._id.rate)?renderStar(element._id.rate):renderStar(0)}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>`)
  }
  $('#products').append(item)

}

function renderStar(number) {
  var goldStar = '<i class="home-product-item__star--gold fas fa-star"></i>'
  var star = '<i class="fas fa-star"></i>'
  var str = ''
  for (var i = 0; i < number ; i++) {
      str += goldStar
  }
  for (var i = 0; i < (5 - number) ; i++) {
      str += star
  }
  return str
}

function priceFormat(price) {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function salePercent(a, b) {
  return Math.round(100 - (a / b * 100))
}

function titleSort() {
  var title = $('#dropdownMenuButton')
  var q= window.location.search
  if (q.search('sn=price&order=1') != -1) {
    return title.html('Giá: Tăng dần');
  }
  if (q.search('sn=price&order=-1') != -1) {
    return title.html('Giá: Giảm dần');
  }
  if (q.search('sn=name&order=1') != -1) {
    return title.html('Tên A->Z');
  }
  if (q.search('sn=name&order=1') != -1) {
    return title.html('Tên Z->A');
  }  
}

titleSort()

function materialFilter(material) {
  var materialFilter = document.querySelectorAll('.material')
  for (var i in materialFilter) {
    if(materialFilter[i].checked) {
      return window.location.search = `material=${material}`
    }
  }
  console.log(materialFilter)
}

function sortFilter(sn, order) {
  var sortFilter = document.querySelectorAll('.dropdown-item')
  for (var i in sortFilter) {
    var q = window.location.search
    if ( q.search('sn') == -1) {
      return window.location.search = q + '&' +`sn=${sn}&order=${order}`
    }
    if ( q.search('gt') > 16) {
      return window.location.search = `sn=${sn}&order=${order}&${q.slice(q.search('gt'))}` 
    }
    if (q.search('sn') != -1) {
      return window.location.search = `${q.slice(1, q.search('sn'))}sn=${sn}&order=${order}`
    }
  }
}

function priceFilter() {
  var priceFilter = document.querySelectorAll('.checkGia');
  for (var i in priceFilter) {
    if(priceFilter[i].checked) {
      var q = window.location.search
      if ( q.search('gt') == -1 || q.search('lt') == -1 ) {
        return window.location.search = window.location.search + '&' + `gt=${parseInt(priceFilter[i].value) == 9999000000 ? 4000000 : parseInt(priceFilter[i].value) - 1000000}&lt=${parseInt(priceFilter[i].value)}`;
      }
      if( q.search('sn') > 10) {
        return window.location.search = `gt=${parseInt(priceFilter[i].value) == 9999000000 ? 4000000 : parseInt(priceFilter[i].value) - 1000000}&lt=${parseInt(priceFilter[i].value)}&${q.slice(q.search('sn'))}`
      }
      if ( q.search('gt') != -1 || q.search('lt') != -1 ) {
        return window.location.search = `${q.slice(1, q.search('gt'))}gt=${parseInt(priceFilter[i].value) == 9999000000 ? 4000000 : parseInt(priceFilter[i].value) - 1000000}&lt=${parseInt(priceFilter[i].value)}`
      }
    }
  }
}

function checkedPriceFilter() {
  var priceFilter = document.querySelectorAll('.checkGia');
  var q = window.location.search;
  switch ( q.slice(q.search('lt'),q.search('lt') + 4)) {
    case 'lt=1':
      document.getElementById('kg1').checked = true;
      break;
    case 'lt=2':
      document.getElementById('kg2').checked = true;
      break;
    case 'lt=3':
      document.getElementById('kg3').checked = true;
      break;
    case 'lt=4':
      document.getElementById('kg4').checked = true;
      break;
    case 'lt=9':
      document.getElementById('kg5').checked = true;
      break;
  }
}

checkedPriceFilter()

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

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  // str = str.replace(/ + /g," ");
  // str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}

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
  if (window.location.pathname == '/product') {
    brandFilter2.classList.remove('hidden')
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