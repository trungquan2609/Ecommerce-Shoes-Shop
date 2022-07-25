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