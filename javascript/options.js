$(document).ready(function() {
   
//localStorage site
    // read saved settings out of local Storage and convert them from JSON to a JS-Object
    saved_settings = $.parseJSON(localStorage["settings"]);

    // is executed, when the page is loaded first
    function init(){
        if(saved_settings != null && saved_settings != undefined){
            if(saved_settings.username != null && saved_settings.username  != undefined){
                $("input#lastfm_username").attr('value', saved_settings.username );
            }
            if(saved_settings.siteaccess_url != null && saved_settings.siteaccess_url  != undefined){
                $("select#lastfm_siteaccess_selectbox option[value='" + saved_settings.siteaccess_url + "']").attr('selected','selected');
            }
        }
        message_empty();
    }
    
    // todo: Kontrolle, wenn ein Feld leer, dann nicht aufgenommen
    $('#btnSave').click(function(){
        var save_json = '{';
            save_json += '"username":"' + $('input#lastfm_username').val() + '",';
            save_json += '"siteaccess_url":"' + $('select#lastfm_siteaccess_selectbox').val() + '"';
            save_json += '}';
        localStorage["settings"] = save_json;
        message_success();
    });

    init();
});

function message_success(){
    $('#message-box').html("The changes were saved succesfully");
}

function message_empty(){
    $('#message-box').html("");
}

// JSON MODELL:
/*
[{
    "username":"bool",
    "siteaccess":"..."
}]



{"lines": [{"frontend_url":"http://ssl_2011.ng.silverproducts.de/","backend_url":"http://ssl_2011.ng.silverproducts.de/backend/"},{"frontend_url":"ddd","backend_url":"aaa"},{"frontend_url":"","backend_url":""}], "shortcuts_enabled":"true","shortcut_key":"F"}
*/