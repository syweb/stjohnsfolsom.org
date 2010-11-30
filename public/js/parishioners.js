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



function get_group_announcements(div_to_append, group_id) {
  $.ajax({
    url: PARISH_URL + "/get_group_announcements.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {
      
      $(div_to_append).append('<div class="event-box"><div class="box-title">Announcements</div>');
        
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");

        $(div_to_append).find('.event-box').append('<div class="event-title">' + response[i].title + '</div>');
        $(div_to_append).find('.event-box').append('<div class="event-dtail">' + response[i].content + '</div>');
        
        if (response[i].has_downloads == true) {
          //'<br/><a href="#">Download Attachment</a>'
          download_link = PARISH_URL + '/download/' + response[i].id;
          $(div_to_append).find('.event-box').find('.event-dtail').append('<br/><a href="' + download_link + '">Download Attachment</a>');
        }
      });
      
      $(div_to_append).append('</div>');
    }
  });

}



function get_group_events(div_to_append, group_id) {
  $.ajax({
    url: PARISH_URL + "/get_group_events.json/" + group_id,
    cache: false,
    type: 'get',
    dataType: 'jsonp',
    success: function(response) {

      $(div_to_append).append('<div class="event-box"><div class="box-title">Upcoming  Events</div>');
        
      $.each(response, function(i, item) {
        var dt = response[i].updated_at.replace(/T|Z/g, " ").replace(/-/g, "/");
        
        date_string = get_event_date(response[i].start_date, response[i].start_time, response[i].end_date, response[i].end_time);

        $(div_to_append).find('.event-box').append('<div class="event-title">' + response[i].title + '<br/><span>' + date_string + '</span></div>');
        $(div_to_append).find('.event-box').append('<div class="event-dtail">' + response[i].description + '</div>');

        if (response[i].has_downloads == true) {
          //'<br/><a href="#">Download Attachment</a>'
          download_link = PARISH_URL + '/download/' + response[i].id;
          $(div_to_append).find('.event-box').find('.event-dtail').append('<br/><a href="' + download_link + '">Download Attachment</a>');
        }
      });
      
      $(div_to_append).append('</div>');

    }
  });

}



function get_event_date(start_date, start_time, end_date, end_time) {
  var d = new Date(start_date);
  //var t = new Date(start_time.replace(/T|Z/g, " ").replace(/-/g, "/"));
  
  return d.toLocaleDateString(); // + ' ' + t.toLocaleTimeString();
}