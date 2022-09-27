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