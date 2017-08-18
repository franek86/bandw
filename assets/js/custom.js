(function(){
  fullPageScroll();
  jsHoverOverlay();
  shrinkHeader();
  slideWrapper();
  hideMobileNav();
})();

function fullPageScroll(){
  $('#fullpage').fullpage({
     scrollingSpeed: 600,
     verticalCentered: false
  });
}

function jsHoverOverlay(){

  var  $hoverOverlay  = $('.hoverOverlay'),
        $h2                  = $('.description h2'),
        $p                 = $('.description p'),
        $replaceImage  = $('#arrow-right-svg .path');

  $hoverOverlay.on('mouseenter', function(){
    $(this).addClass('js-hover');
    //  change color of h3 nad h6
    $([$h2, $p]).each(function(){
      $(this).css('color', '#fff');
    });
    // replace image
    $replaceImage.css('fill', '#725555');
  }).on('mouseleave', function(){
    $(this).removeClass('js-hover');
    $([$h2, $p]).each(function(){
      $(this).css('color', '#725555');
    });
    // replace image
    $replaceImage.css('fill', '#fff');
  });

}

function shrinkHeader(){
  $(window).on('scroll', function(){
    var fromTop = $(this).scrollTop();

    if(fromTop > 100){
		  $("#header").addClass("shrink");
		} else {
			$("#header").removeClass("shrink");
		}
  });
}

function slideWrapper(){
  $('.slide-wrapper').first().addClass('active-slide');
  $('.bandwbtn').first().addClass('active-slide');

  $('.bandwbtn').on('click', function(){
    var $this = $(this),
          $child = $this.parent().children(),
          $order = $child.index($this);

    $('.slide-wrapper').removeClass('active-slide').eq($order).addClass('active-slide');
    $child.removeClass('active-slide');
    $this.addClass('active-slide');
  });
}

function hideMobileNav() {
  $(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
  });
}
