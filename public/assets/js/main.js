jQuery(document).ready(function($) {


    'use strict',
    new WOW().init();


  $('#email').text(v_email);
  $('#address').html(v_address);
$('.promo_info').css('height',$('.promo_info .container').height()+20);
var pad = $(window).height() - ($('#header').height() + $('#for_logo_container').height() + $('#slogan').height()+$('.promo_info .container').height()+30);
var pad1= pad/2;
/*
console.log($(window).height());
console.log($('#header').height());
console.log($('#for_logo_container').height());
console.log($('#slogan').height());
console.log($('.promo_info').height());
console.log($('#header').height() + $('#for_logo_container').height() + $('#slogan').height() + $('.promo_info').height());
*/
marg = pad1 + 'px';
$('#for_logo_container').css('margin-top',marg);
$('.promo_info').css('margin-top',marg);
//console.log(marg);

          $( "#slider-range" ).slider({
                 range: true,
                 min: 650,
                 max: 5000,
                 values: [ 1000, 3299 ],
                      slide: function( event, ui ) {
                            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                           }
             });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +" - $" + $( "#slider-range" ).slider( "values", 1 ) );
 

 /* ======= Fixed header when scrolled ======= */
    if ($(window).scrollTop() > 50) {
            $('#header').addClass('navbar-fixed-top');
           //  $('.promo_info').addClass('opened');
         }else{

                //$('.promo_info').addClass('open');
         }
$('.promo_info').addClass('open');
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 400});
    
    /* ======= Fixed header when scrolled ======= */
    
    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 50) {
             $('#header').addClass('navbar-fixed-top');
         }
         else {
             $('#header').removeClass('navbar-fixed-top');
         }
    });
   
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -70, 'axis':'y', easing:'easeOutQuad'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
		
	});



});