var PARISH_URL = 'http://stjohnfolsom.test-schoolyardapp.info/';

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


function get_current_ministry_announcements(div_to_append, class_id, number){

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    // url: "http://stjohnfolsom.lvh.me:4000" + "/get_current_ministry_announcements.json/" + class_id,
    url: PARISH_URL + "/get_current_ministry_announcements.json/" + class_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
    
      $(div_to_append).append('<div id="accordion" class="event-box"><div class="box-title">Announcements</div></div>');
      
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

        var event_link = 'event-link-' + response[i].id;

        if (i < number) {

          $(div_to_append).find('.event-box').append('<div class="event-title "><a >' + response[i].title + '</a></div>');
          $(div_to_append).find('.event-box').append('<div class="event-dtail ">' + response[i].content + '<span id="' + event_link + '"></span></div>');
      
          if (response[i].has_downloads == true) {
            download_link = PARISH_URL + '/publik/download/' + response[i].id;
            $(div_to_append).find('#'+event_link).append('<br/><a href="' + download_link + '">Download Attachment</a>');
          }
        }

      });
		
	  for_accordian('accordian_1');
    }
  });
}


function get_current_ministry_events(div_to_append, group_id, number) {

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    url: PARISH_URL + "/get_current_ministry_events.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {

      

      $(div_to_append).append('<div id="accordion" class="cls-events"><h4>Special Upcoming Events</h4><ul id="events" ></ul>');
      
      $.each(response.reverse(), function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");
        
        date_string = get_event_date(response[i].start_date, response[i].start_time, response[i].end_date, response[i].end_time);
        var event_link = 'event-link-' + response[i].id;



        detail = '';
        if (response[i].description == 'NA') {
          detail = '<div class="event-dtail">'; //'<span id="' + event_link + '"></span></div>';
        } else {
          detail = '<div class="event-dtail"><br/>' + response[i].description + '</div>'; //<span id="' + event_link + '"></span>';
        }

        if (i < number) {
          $(div_to_append).find('#events').append('<li><div class="event-title "><div class="date">' + date_string + '</div><div class="event-title-text"><a>' + response[i].title + '</a></div><div class="sptr1"></div></div>'
          + detail
          + '</li>');
        }

        if (response[i].has_downloads == true) {
          download_link = PARISH_URL + '/publik/download/' + response[i].id;
          $(div_to_append).find('#'+event_link).append('<br/><a href="' + download_link + '">Download Attachment</a>');
        }
				
      });
     
      $(div_to_append).append('</div>');
	  for_accordian('accordian_2');	
    }
  });

}
