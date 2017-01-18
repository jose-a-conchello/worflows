$(function() {
  var Mustache = require('mustache');
  // uses jquery but that is included in the coffee file already
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);    
  }); //getJSON
  
}); //function
