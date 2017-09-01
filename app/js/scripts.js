$(document).ready(function set() {

  // On menu click -> slide down
  $('.main-nav__icon').click(function(e) {
      // $('.main-nav__menu').toggleClass('menu-active');
      if ($('.main-nav__menu').css('display') == 'none'){
        e.stopPropagation();
        $('.main-nav__menu').slideToggle('slow');
      }

  });

  // Hides down menu if is mobile or iPad version
  $(document).click(function(e){
    var display = $('.main-nav__menu').css('display');
    var winWidth = $(window).width();

    // if(winWidth < 2000){
    //   $('.main-nav__menu').slideUp();
    // }
    if (display == 'none' || display == 'block'){
      $('.main-nav__menu').slideUp();
    }

  });




    //Curiosities section slider
    $('.curiosities__owl-carousel').owlCarousel({
      items: 1,
      autoplay:false,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      loop: true,
      // dots: false, //show dots navigation
      // rewind: true
    });

    //History section slider
    $('.timeline__owl-carousel').owlCarousel({
      items: 1,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      dots: false, //show dots navigation
      rewind: true
    });


    //Menu scroll down to page sections on link click

    // Select all links with hashes
    let scrollMenuDown = function (){

      $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 1000, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                };
              });
            }
          }
        });
    }

    scrollMenuDown();


});
