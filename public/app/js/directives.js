var agDirectives = angular.module('agDirectives', []);

agDirectives.directive('splitlayout', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var target = element.find(".about");
      target.on('click', function(){
        if ( element.hasClass('reset-layout') ) {
    			element.removeClass('close-right');
    			element.addClass('open-left');
    			element.removeClass('close-left');
    			element.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
    			function() {
    				element.removeClass('reset-layout');
    			});
    		 }
    		else if ( element.hasClass('open-left') ) {
    			element.removeClass('reset-layout');
    			element.removeClass('open-left');
    			element.addClass('close-left');
    			element.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
    			function() {
    				element.addClass('reset-layout');
    			});
    		}
    		target.find('.fa-times').toggleClass('opacity-hide');
    		target.find('.fa-info').toggleClass('opacity-hide');
      });
    }
  };
});

agDirectives.directive('owlcarousel', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.owlCarousel({
          loop:true,
      	autoplay:true,
      	nav:false,
      	dots:true,
      	smartSpeed: 1500,
          margin:30,
      	items:3,
          responsiveClass:true,
      	responsive:{
              0:{
                  items:1,
                  nav:true
              },
              600:{
                  items:2,
                  nav:true
              },
      		1000:{
                  items:3,
                  nav:true
              }
          }
      	});
    }
  };
});

agDirectives.directive('typewriter', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.typed({
      		strings: [" Top Agents", " Stay Tuned", " Dream Home"],
      		typeSpeed: 100,
      		backDelay: 900,
      		loop: true,
      		cursorChar: "|",
      		contentType: 'html', // or text
      		// defaults to false for infinite loop
      		loopCount: false
      	});
    }
  };
});

agDirectives.directive('toggleauthform', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var toggle = element.find("a");
      toggle.bind('click', function() {
          element.find("form").animate({height: "toggle", opacity: "toggle"}, "slow");
      });
    }
  };
});

agDirectives.directive('toggleTwoClass', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('click', function() {
            element.toggleClass(attrs.toggleClass);
        });
    }
  };
});
