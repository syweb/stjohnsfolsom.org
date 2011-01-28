//ministries quick view
$(function(){

	$('.quick-view-ministries').click(function(){
		$('.quick-view-mini-slide').slideToggle('slow',function(){
			$('.quick-view-mini-slide').hover(
					function(){

					},
					function(){
						$('.quick-view-mini-slide').slideUp();
					}
				)
		
		})
	})
})