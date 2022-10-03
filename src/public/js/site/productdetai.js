$(document).ready(function(){
    $(".big-img").imagezoomsl({
      zoomrange: [3, 3]
      
    });
  });
  function fadeInModal()
  {
      $('#alert-cart').fadeIn();   
      $('.overlay1').fadeIn(); 
  }
  function fadeOutModal()
  {
      $('#alert-cart').fadeOut();
      $('.overlay1').fadeOut();
  }
  function fadeout()
  {
      $('.overlay1').fadeOut();
      $('#alert-cart').fadeOut();
  }
  setInterval(fadeOutModal, 7000);

function render() {

}

function check(){
    
    var type = document.getElementsByName("size");
    for ( var i in type) {
        if( type[i].checked){
            var val = type[i].value;
            var qty = $('#text_so_luong-1').val()
            $('#add-to-cart').prop('href', `/cart/addtocart/${val}?qty=${qty}`)
            console.log(val)
        }
    }
}

function rateStar(number) {
    var userId = $("input[name=userId]").val();
    var sku = $("input[name=SKU]").val();
    window.location = `/feedback/rate?star=${number}&sku=${sku}&userId=${userId}`;
}

var feedbackApi = `/api/feedback/${window.location.pathname.slice(8)}`

fetch(feedbackApi)
.then(response => response.json())
.then(rs => {
    for (var i in rs.comment) {
        for ( var j in rs.rate ) {
            var commentByUser = rs.comment[i].userId._id.toString()
            var rateByUser = rs.rate[j].userId._id.toString()
            if ( commentByUser == rateByUser ) {
                Object.assign(rs.comment[i], {rate: rs.rate[j].rate})
            } 
            if ( !rs.comment[i]?.rate) {
                    rs.comment[i].rate = 0
            }
        }
    }
    for (var j in rs.rate) {
        if ( !rs.comment.find(element => element.userId._id === rs.rate[j].userId._id) ) {
            rs.comment.push({
                _id: rs.rate[j]._id,
                SKU: rs.rate[j].SKU,
                comment: '',
                rate: rs.rate[j].rate,
                userId: rs.rate[j].userId,
                createdAt: rs.rate[j].createdAt,
                updatedAt: rs.rate[j].updatedAt
            })
        }
    }
    $('.body__comment').html('')
    var comment = rs.comment.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    for (var i in comment) {
        var element = comment[i]
        renderComment(element)
    }
    $('#info-rate').html('')
    $('#info-rate').append(`${renderStar(rs.star)}`)
})

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

function renderComment(element) {
    var item = $(`
        <div class="comment">
            <img class="comment-img" src="${element.userId.avatar}" onerror="this.src='/img/userImages/noavatar.png';" alt="" >
            <div class="comment__content">
                <div class="comment__content-heding">
                    <h4 class="comment__content-name">${ element.userId.fullname ? element.userId.fullname : element.userId.email}</h4>
                    <span class="comment__content-time">${new Date(element.updatedAt).toLocaleDateString('en-GB')}</span>
                </div>
                <div class="home-product-item__rating" id="user_rating-${element._id}" style="font-size: 14px;transform-origin: left;margin-bottom: 5px">
                    ${renderStar(parseInt(element.rate))}
                </div>
                <div class="comment__content-content">
                    <span>${element.comment}</span>
                </div>
            </div>
        </div>
        `)
    $('.body__comment').append(item)
}


