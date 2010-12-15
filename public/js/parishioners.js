var PARISH_URL = 'https://stjohnfolsom.schoolyardapp.com';
//var PARISH_URL = 'http://stjohnfolsom.local-sy.com:4000';

$(document).ready(function() {
  
  //get_announcements("#announcements");
  //get_events("#events");

  //get_group_announcements("#group_announcements", "1012");
  //get_group_events("#group_events", "1012");
  
  //get_group_announcements("#group_announcements", "101233");
  //get_group_events("#group_events", "101233");
});

function for_accordian(){
	//Accordian Start
	$('.event-dtail').css({ display:"none"});
	$('.event-dtail:first').css({ display:"block"});
	$('.event-title:first').addClass('ui-state-active');
	
	
	$(".announcements .event-title").click(function(){
			if($(this).attr("class").match(/ui-state-active/) == 'ui-state-active'){
				
			}
			else{
				$('.announcements .event-dtail').slideUp("slow");
				$('.announcements .event-title').removeClass('ui-state-active');
				
				$(this).next().slideDown("slow");
				$(this).addClass('ui-state-active');
			}
			
		});


	$(".event-list .event-title").click(function(){
			if($(this).attr("class").match(/ui-state-active/) == 'ui-state-active'){

			}
			else{
				$('.event-list .event-dtail').slideUp("slow");
				$('.event-list .event-title').removeClass('ui-state-active');

				$(this).next().slideDown("slow");
				$(this).addClass('ui-state-active');
			}

		});
	//Accordian End
}

function get_announcements(div_to_append) {
  $.ajax({
    url: PARISH_URL + "/get_announcements.json",
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");
        $(div_to_append).append('<div class="data-block long-block">');
        $(div_to_append).append('<h5>' + response[i].title + '</h5>');
        $(div_to_append).append('<p>' + 'Posted on :: ' + dt + '</p>');
        $(div_to_append).append(response[i].content);
        $(div_to_append).append('</div>');

      });
    }
  });

}



function get_events(div_to_append) {
  $.ajax({
    url: PARISH_URL + "/get_events.json",
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");
        $(div_to_append).append('<div class="data-block long-block">');
        $(div_to_append).append('<h5>' + response[i].title + '</h5>');
        $(div_to_append).append('<p>' + 'Posted on :: ' + dt + '</p>');
        $(div_to_append).append(response[i].description);
        $(div_to_append).append('</div>');

      });
    }
  });

}


function get_group_bulletins(div_to_append, group_id, number) {

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    url: PARISH_URL + "/get_group_announcements.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
    
      $(div_to_append).append('<div class="bulletins-box"><h3>Bulletins</h3><dl class="bulletins-dl"></dl></div>');
      
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

        var event_link = 'event-link-' + response[i].id;

        if (i < number) {

      
          if (response[i].has_downloads == true) {
            //'<br/><a href="#">Download Attachment</a>'
            download_link = PARISH_URL + '/publik/download/' + response[i].id;

            $(div_to_append).find('.bulletins-dl').append('<span id="' + event_link + '"></span>');

            $(div_to_append).find('#'+event_link).append('<dd class="time"><a href="' + download_link + '">' + response[i].title + '</a></dd><dd class="sptr"></dd>');
          }
        }

      });


    }
  });

}


function get_group_announcements(div_to_append, group_id, number) {

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    url: PARISH_URL + "/get_group_announcements.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
    
      $(div_to_append).append('<div id="accordion" class="event-box"><div class="box-title">Announcements</div></div>');
      
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

        var event_link = 'event-link-' + response[i].id;

        if (i < number) {

          $(div_to_append).find('.event-box').append('<div class="event-title ">' + response[i].title + '</div>');
          $(div_to_append).find('.event-box').append('<div class="event-dtail ">' + response[i].content + '<span id="' + event_link + '"></span></div>');
      
          if (response[i].has_downloads == true) {
            download_link = PARISH_URL + '/publik/download/' + response[i].id;
            $(div_to_append).find('#'+event_link).append('<br/><a href="' + download_link + '">Download Attachment</a>');
          }
        }

      });
		
	  for_accordian();
    }
  });

}



function get_group_events(div_to_append, group_id, number) {

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    url: PARISH_URL + "/get_group_events.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {

      

      $(div_to_append).append('<div id="accordion" class="quicklink"><h4>Upcoming Events</h4><ul id="events"></ul>');
      
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
          $(div_to_append).find('#events').append('<li><div class="event-title "><div class="date">' + date_string + '</div>' + response[i].title + '</div'
          + detail
          + '<div class="sptr1"></div></li>');
        }

        if (response[i].has_downloads == true) {
          download_link = PARISH_URL + '/publik/download/' + response[i].id;
          $(div_to_append).find('#'+event_link).append('<br/><a href="' + download_link + '">Download Attachment</a>');
        }
      });
      
      $(div_to_append).append('</div>');

    }
  });

}



function get_event_date(start_date, start_time, end_date, end_time) {
  var m_names = new Array("Jan", "Feb", "Mar", 
  "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
  "Oct", "Nov", "Dec");

  var d = new Date(start_date);
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();

  return m_names[curr_month] + ' ' + curr_date;
}