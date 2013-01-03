var PARISH_URL = 'https://stjohnfolsom.schoolyardapp.com';
//var PARISH_URL = 'https://saintjosephredding.schoolyardapp.com';
//var PARISH_URL = 'http://stjohnfolsom.local-sy.com:4001';

function for_accordian(accordian_no){

	accordian_no = '.'+accordian_no + ' ';

	//Accordian Start
	$(accordian_no + '.event-dtail').css({ display:"none"});
	//$(accordian_no + '.event-dtail:first').css({ display:"block"});
	//$(accordian_no + '.event-title:first').addClass('ui-state-active');


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


function get_group_bulletins(div_to_append, group_id, sort_by_field, order_by_value, number) {
  
  if (typeof sort_by_field  == "undefined"){ sort_by_field = "title"; }  
  if (typeof order_by_value == "undefined"){ order_by_value = "asc"; }
  if (typeof number == "undefined") { number = 6; }

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
        response[i] = response[i].announcement;
        
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
  
  if (typeof sort_by_field  == "undefined"){ sort_by_field = "title"; }
  if (typeof order_by_value == "undefined"){ order_by_value = "asc"; }
  if (typeof number == "undefined") { number = 6; }

  $.ajax({
    url: PARISH_URL + "/get_group_announcements.json/" + group_id + "/"+ sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      show_announcement(response, div_to_append, number);
    }
  });

}

function get_home_page_announcements(div_to_append, sort_by_field, order_by_value, number) {
  
  if (typeof sort_by_field  == "undefined"){ sort_by_field = "title"; }
  if (typeof order_by_value == "undefined"){ order_by_value = "asc"; }
  if (typeof number == "undefined") { number = 6; }

  $.ajax({
    url: PARISH_URL + "/get_home_page_announcements.json/" + sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      show_announcement(response, div_to_append, number);
    }
  });

}


function show_announcement(response, div_to_append, number) {
  if (response != ""){
       $(div_to_append).append('<div id="accordion" class="event-box"><div class="box-title">Announcements</div></div>');
  }

  $.each(response, function(i, item) {
    response[i] = response[i].announcement;

    var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

    var event_link = 'event-link-' + response[i].id;

    if (i < number) {

      $(div_to_append).find('.event-box').append('<div class="event-title "><a>' + response[i].title + '</a></div>');
      $(div_to_append).find('.event-box').append('<div class="event-dtail">' + response[i].content + '<span id="' + event_link + '"></span></div>');

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

function get_group_events(div_to_append, group_id, sort_by_field, order_by_value, number, group_name) {
  
  if (typeof sort_by_field  == "undefined"){ sort_by_field = "title";}
  if (typeof order_by_value == "undefined"){ order_by_value = "asc"; }
  if (typeof number == "undefined") { number = 6; }
  if (typeof group_name == "undefined") { group_name = "Upcoming Events"; }
 

  $.ajax({
    url: PARISH_URL + "/get_group_events.json/" + group_id + "/"+ sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) { 
      show_event(response, div_to_append, number, group_name); 
    }
  });

}



function get_home_page_events(div_to_append, sort_by_field, order_by_value, number, group_name) {
  
  if (typeof sort_by_field  == "undefined"){ sort_by_field = "title";}
  if (typeof order_by_value == "undefined"){ order_by_value = "asc"; }
  if (typeof number == "undefined") { number = 6; }
  if (typeof group_name == "undefined") { group_name = "Upcoming Events"; }
 

  $.ajax({
    url: PARISH_URL + "/get_home_page_events.json/" + sort_by_field + "/" + order_by_value,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) { 
      show_event(response, div_to_append, number, group_name); 
    }
  });

}


function get_group_welcome(div_to_append, group_id) {
  
  $.ajax({
    url: PARISH_URL + "/get_group_welcome.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) { 
      show_welcome(response, div_to_append);
      //this code for Show Video on Ministries-13.html
      $(div_to_append).find(".lightbox").overlay(overlayConfig);
    }
  });

}


function show_welcome(response, div_to_append) {

  $.each(response, function(i, item) {
    response[i] = response[i].welcome_message;

    var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

    var event_link = 'event-link-' + response[i].id;

   // $(div_to_append).append('<h2>' + response[i].title + '</h2>');
    $(div_to_append).append('<div class="incol1" style="padding-bottom: 30px;"><div class="incol1-inner">' + response[i].content + '</div>');

  });
  if (response != ""){
    $(div_to_append).append('');
  }
}



function show_event(response, div_to_append, number, group_name) {
  if (response != ""){
    $(div_to_append).append('<div id="accordion" class="cls-events"><h4>' + group_name + '</h4><ul id="events" ></ul>');
  }

  $.each(response, function(i, item) {
    
    response[i] = response[i].calendar;
    
    var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");
    response[i].start_date = response[i].start_date.replace(/T|Z/g, " ").replace(/-/g, "/");
    response[i].end_date = response[i].end_date.replace(/T|Z/g, " ").replace(/-/g, "/");

    date_string = get_event_date(response[i].start_date, response[i].start_time, response[i].end_date, response[i].end_time);
    var event_link = 'event-link-' + response[i].id;
    detail = '';
    if (response[i].description == 'NA') {
      detail = '<div class="event-dtail"><span id="' + event_link + '"></span></div>';
    } else {
      detail = '<div class="event-dtail">' + response[i].content + '<span id="' + event_link + '"></span></div><div class="sptr1"></div>';
    }

    if (i < number) {
      $(div_to_append).find('#events').append('<li><div class="event-title "><div class="date"><em>' + date_string + '</em></div><div class="event-title-text">' + response[i].title + '</div><div class="sptr1"></div></div>'
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




function get_home_page_forms(div_to_append, group_id, group_name, number) {

  if (typeof group_name == "undefined") { group_name = "Files and Form"; }
  
  $.ajax({
    url: PARISH_URL + "/get_home_page_forms.json/",
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      show_form(response, div_to_append, group_id, 'Files and Forms', number);
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
      show_form(response, div_to_append, group_id, group_name, number);
    }
  });

}

function show_form(response, div_to_append, group_id, group_name, number) {
    
  $(div_to_append).append('<div id="accordion" class="cls-events"><div class="box-title">&nbsp;&nbsp;&nbsp;<em>' + group_name + '</em></div><ul id="events" ></ul>');

  $.each(response.reverse(), function(i, item) {
    response[i] = response[i].form;
    
    var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

    date_string = get_event_date(response[i].start_date, response[i].start_time, response[i].end_date, response[i].end_time);
    download_link = PARISH_URL + '/publik_file_download/' + response[i].id;


    $(div_to_append).find('#events').append('<li><div><div class="event-title"><a href="' + download_link + '">' + response[i].title + '</a></div><div class="sptr1"></div></div>'
    + '</li>');
  });

  $(div_to_append).append('</div>');
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


// This is for header event icon
function get_event_icon(){
$('.header-full .container').append('<div id="event-icon" ><a href="index.html" title="Christmas"><img src="images/event-icon-cristmas.png" alt="Christmas" /> </a></div>')
}