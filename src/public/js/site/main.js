function hienthidanhmucluachon(){
    $(".header__category").removeClass("undisplay");
    $(".header__category").addClass("display");
}
function khonghienthidanhmucluachon(){
    $(".header__category").removeClass("display");
    $(".header__category").addClass("undisplay");
}
// slide show

// go to top
var showGoToTop = 300;

$(window).scroll(function(){
    if($(this).scrollTop() >= showGoToTop){
        $('#go-to-top').fadeIn();
    } else {
        $('#go-to-top').fadeOut();
    }
});
$('#go-to-top').click(function(){
    $('html, body').animate({scrollTop: 0 }, 'slow');
});
// change img
function changeImg(id){
    let imgPath = document.getElementById(id).getAttribute('src');
    document.getElementById('img-main').setAttribute('src', imgPath);
}
function check(){
    
    var type = document.getElementsByName("size");
    var pathName = window.location.pathname
    for ( var i in type) {
        if( type[i].checked){
            var val = type[i].value;
            var qty = $('#text_so_luong-1').val()
            $('#add-to-cart').prop('href', `/cart/addtocart/${val}?qty=${qty}`)
            fetch(`/api${pathName}?_id=${val}`)
            .then(response => response.json())
            .then(rs => renderQuantity(rs))
        }
    }
}

function renderQuantity(element) {
    $('#info-quantity').html('')
    var item = `Số lượng: <b>${element[0].quantity}</b>`
    $('#info-quantity').append(item);
}

$('.add-cart').click(function(){
    check()
})

$(document).ready(function(){
    $(window).resize(function() {
        if($(window).width() < 739) {
            $('.collapse').removeClass('show');
        }
        else
        {
            $('.collapse').addClass('show');
        }
    });
    // click mega menu
    $('.header_nav-list .header_nav-list-item a').click(function() {
        $('.header_nav-list-item a').removeClass('active');
        $(this).addClass('active');
    });
    $('.ng-has-child1 > a i').click(function(e){
        e.preventDefault();
        $('.ul-has-child1').toggle('slow');
        $('.cong').toggleClass('hidden');
        $('.tru').toggleClass('hidden');
    })
   
    $('.ng-has-child2 > a i').click(function(e){
        e.preventDefault();
    })
    $('#trigger-mobile').click(function(e){
        $('.mobile-main-menu').toggleClass('xyz');
        $('.overlay').toggleClass('hidden');
    })
    $('.overlay').click(function(e){
        $('.mobile-main-menu').toggleClass('xyz');
        $('.overlay').toggleClass('hidden');
    })
    // click thông tin đơn hàng trang pay
    $('.summary').click(function(){
        $('.summary-content').toggle('slow');
    })
})
function hienthi(id, name){
    $(`#${name}`).toggle('slow');
    $(`.cong${id}`).toggleClass('hidden');
    $(`.tru${id}`).toggleClass('hidden');
}

function cong(id) {
    var value = document.getElementById(`text_so_luong-${id}`).value
    document.getElementById(`text_so_luong-${id}`).value = parseInt(value) + 1;
    $(`#total_price-${id}`).html('')
    var price = $(`#price-${id}`).val().replaceAll(',','')
    $(`#total_price-${id}`).html(`${priceFormat(parseInt(price)*(parseInt(value) + 1))}₫`)
    totalPriceAll()
}

function tru(id) {
    var value = document.getElementById(`text_so_luong-${id}`).value
    if(parseInt(value) > 1)
    {
    $(`#total_price-${id}`).html('')
    var price = $(`#price-${id}`).val().replaceAll(',','')
    $(`#total_price-${id}`).html(`${priceFormat(parseInt(price)*(parseInt(value) - 1))}₫`)
        document.getElementById(`text_so_luong-${id}`).value = parseInt(value) - 1;
    }
    totalPriceAll()
}

function totalPriceAll() {
    $('.total__price-all').html('')
    var totalPrice = document.getElementsByClassName('total_price');
    var arr = []
    for ( var i = 0; i < totalPrice.length; i++) {
        var totalPriceInt = parseInt(totalPrice[i].innerHTML.slice(0, totalPrice[i].innerHTML.length - 1).replaceAll(',',''));
        arr.push(totalPriceInt)
    }
    var totalPriceAll = arr.reduce((a,b) => a + b,0)
    $('.total__price-all').html(`${priceFormat(totalPriceAll)}₫`)
}

totalPriceAll()

function quantityInput(id) {
    $(`#total_price-${id}`).html('')
    var quantityInput = $(`#text_so_luong-${id}`).val()
    var price = $(`#price-${id}`).val().replaceAll(',','')
    var totalPrice = $(`#total_price-${id}`)
    totalPrice.html(`${priceFormat(quantityInput*price)}₫`)
    totalPriceAll()
}

function priceFormat(price) {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function validate(evt, id) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function xoa(id) {
    $(`.cart-body-row-${id}`).fadeOut();
}

const trungne = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.item-manager')
const panes = $$('.item-detail')
// console.log(tabs)
tabs.forEach(function(tab, index) {
    const pane = panes[index]
    tab.onclick = function() {
        trungne('.item-manager.active').classList.remove('active')
        trungne('.item-detail.active').classList.remove('active')
        this.classList.add('active')
        pane.classList.add('active')
    }
})

// function search() {
//     var formInput = $('#form-input');
//     var textSearch = $('input[name="search"]').value;
//     var btnSubmit = $('.search-btn');
//     formInput.preventDefault;
//     btnSubmit.preventDefault;
//     btnSubmit.on('click', function(e) {
//         console.log(textSearch);ư
//     })

// }
// search()