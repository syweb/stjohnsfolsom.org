// this is for top-menu2
$(function(){
	$.get('/m-menu2.html', function(data) {
		$('.top-menu').after(data);
	})
	
	$('ul.site-menu > li').live('mouseenter', function(){
	  $(this).addClass('hover')
	  $(this).find('ul:first').css({visibility: "visible"});
	})
	
	$('ul.site-menu > li').live('mouseleave', function(){
	  $(this).removeClass('hover')
	  $(this).find('ul:first').css({visibility: "hidden"});
	})
	
	$('ul.site-menu-2 > li').live('mouseenter', function(){
	  $(this).addClass('hover')
	  $(this).find('ul:first').css({visibility: "visible"});
	})
	
	$('ul.site-menu-2 > li').live('mouseleave', function(){
	  $(this).removeClass('hover')
	  $(this).find('ul:first').css({visibility: "hidden"});
	})
	
})