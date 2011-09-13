
//ministries quick view
$(function(){
	$.get('/m-menu.html', function(data) {
		$('.top-menu > .container').append(data);
		$('.link5 > a').click(function(){
			$('.quick-view-mini-slide').slideToggle('',function(){
				$('.quick-view-mini-slide').hover(
						function(){

						},
						function(){
							$('.quick-view-mini-slide').slideUp();
						}
					)

			})
		})
	});
})