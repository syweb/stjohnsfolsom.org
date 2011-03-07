var PARISH_URL = 'https://stjohnfolsom.schoolyardapp.com';

function for_accordian(accordian_no){

	accordian_no = '.'+accordian_no + ' ';

	//Accordian Start
	$(accordian_no + '.event-dtail').css({ display:"none"});
	$(accordian_no + '.event-dtail:first').css({ display:"block"});
	$(accordian_no + '.event-title:first').addClass('ui-state-active');


	$(accordian_no + '.event-title').click(function(){
			if($(this).attr("class").match(/ui-state-active/) == 'ui-state-active'){

			}
			else{
				$(accordian_no + '.event-dtail').slideUp("slow");
				$(accordian_no + '.event-title').removeClass('ui-state-active');

				$(this).next().slideDown("slow");
				$(this).addClass('ui-state-active');
			}

		});


	$(accordian_no + ' .event-list .event-title').click(function(){
			if($(this).attr("class").match(/ui-state-active/) == 'ui-state-active'){

			}
			else{
				$(accordian_no + '.event-list .event-dtail').slideUp("slow");
				$(accordian_no + '.event-list .event-title').removeClass('ui-state-active');

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


// function get_group_bulletins(div_to_append, group_id, number) {
function get_group_bulletins(div_to_append, group_id, sort_by_field, order_by_value, number) {
  
  if (typeof sort_by_field  == "undefined"){
    sort_by_field = "title";
  }
  
  if (typeof order_by_value == "undefined"){
    order_by_value = "asc";
  }

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    url: PARISH_URL + "/get_group_announcements.json/" + group_id + "/"+ sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      if (response != ""){
        $(div_to_append).append('<div class="bulletins-box"><h3>Bulletins</h3><dl class="bulletins-dl"></dl></div>');
      }

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


function get_group_announcements(div_to_append, group_id, sort_by_field, order_by_value, number) {
  
  if (typeof sort_by_field  == "undefined"){
    sort_by_field = "title";
  }
  
  if (typeof order_by_value == "undefined"){
    order_by_value = "asc";
  }

  if (typeof number == "undefined") {
      number = 6;
  }

  $.ajax({
    url: PARISH_URL + "/get_group_announcements.json/" + group_id + "/"+ sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
        if (response != ""){
             $(div_to_append).append('<div id="accordion" class="event-box"><div class="box-title">Announcements</div></div>');
        }

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
         if (response != ""){
              $(div_to_append).append('<div class="event-box-sptr"></div>');
            }
	  for_accordian('accordian_1');
    }
  });

}



function get_group_events(div_to_append, group_id, sort_by_field, order_by_value, number, group_name) {
  
  if (typeof sort_by_field  == "undefined"){
    sort_by_field = "title";
  }
  
  if (typeof order_by_value == "undefined"){
    order_by_value = "asc";
  }

  if (typeof number == "undefined") {
      number = 6;
  }
  
  if (typeof group_name == "undefined") {
      group_name = "Upcoming Events";
  }
 

  $.ajax({
    url: PARISH_URL + "/get_group_events.json/" + group_id + "/"+ sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
        if (response != ""){
          $(div_to_append).append('<div id="accordion" class="cls-events"><h4>' + group_name + '</h4><ul id="events" ></ul>');
        }

      // $.each(response.reverse(), function(i, item) {
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

        date_string = get_event_date(response[i].start_date, response[i].start_time, response[i].end_date, response[i].end_time);
        var event_link = 'event-link-' + response[i].id;



        detail = '';
        if (response[i].description == 'NA') {
          detail = '<div class="event-dtail"><span id="' + event_link + '"></span></div>';
        } else {
          detail = '<div class="event-dtail"><br/>' + response[i].description + '<span id="' + event_link + '"></span></div>';
        }

        if (i < number) {
          $(div_to_append).find('#events').append('<li><div class="event-title "><div class="date">' + date_string + '</div><div class="event-title-text"><a>' + response[i].title + '</a></div><div class="sptr1"></div></div>'
          + detail
          + '</li>');

          if (response[i].has_downloads == true) {
            download_link = PARISH_URL + '/publik/download/' + response[i].id;
            $(div_to_append).find('#'+event_link).append('<br/><a href="' + download_link + '">Download Attachment</a>');
          }


        }

      });

      $(div_to_append).append('</div>');
      if (response != ""){
        $(div_to_append).append('<div class="event-box-sptr"></div>');
        }
	  for_accordian('accordian_2');
    }
  });

}


function get_group_forms(div_to_append, group_id, group_name, number) {

  $.ajax({
    url: PARISH_URL + "/get_group_forms.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {



      $(div_to_append).append('<div id="accordion" class="cls-events"><div class="box-title">&nbsp;&nbsp;&nbsp;<em>' + group_name + '</em></div><ul id="events" ></ul>');

      $.each(response.reverse(), function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

        date_string = get_event_date(response[i].start_date, response[i].start_time, response[i].end_date, response[i].end_time);
        download_link = PARISH_URL + '/publik_file_download/' + response[i].id;


        $(div_to_append).find('#events').append('<li><div><div class="event-title"><a href="' + download_link + '">' + response[i].title + '</a></div><div class="sptr1"></div></div>'
        + '</li>');
      });

      $(div_to_append).append('</div>');
	    //for_accordian('accordian_2');
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