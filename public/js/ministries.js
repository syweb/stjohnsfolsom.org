//ministries quick view
$(function(){
	$.get('/m-menu.html', function(data) {
		$('.incol2').prepend(data);
		$('.quick-view-ministries').click(function(){
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