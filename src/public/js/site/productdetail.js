$(document).ready(function(){
    $(".big-img").imagezoomsl({
      zoomrange: [3, 3]
      
    });
  });
  function fadeInModal()
  {
      $('.alert').fadeIn();   
      $('.overlay1').fadeIn(); 
  }
  function fadeOutModal()
  {
      $('.alert').fadeOut();
      $('.overlay1').fadeOut();
  }
  function fadeout()
  {
      $('.overlay1').fadeOut();
      $('.alert').fadeOut();
  }
  setInterval(fadeOutModal, 7000);