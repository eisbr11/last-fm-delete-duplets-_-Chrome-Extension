// Code for deleting duplets in lastfm
jQuery.noConflict();
var current_track_id = "";
jQuery('#content table#deletablert').children().children().each(function(){
    if (current_track_id == jQuery(this).attr("data-track-id")) {
        jQuery(this).children('td.deleteCell').children().first().click();
    } else {
        current_track_id = jQuery(this).attr("data-track-id");
    }
});