var saved_settings = $.parseJSON(localStorage["settings"]);

var lastfm_username = saved_settings.username;
var lastfm_trackurl = saved_settings.siteaccess_url + "user/" + lastfm_username + "/tracks";

// fired when the button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // Update settings
    update_settings();
    if (is_url_right(tab.url)){
        // if you're on the right page, execute content-script
        delete_duplets(tab);
    } else {
        // change tab, or create if not existent
        change_to_url_or_create(lastfm_trackurl);
    }
});

// test if the url is the right one
function is_url_right( url ) {
    // case-insensitive URL-Comparison
    if (url.toLowerCase().indexOf(lastfm_trackurl.toLowerCase())>-1){
        return true;
    } else {
        return false;
    }
}

// logic for deleting double entries in LastFM scrobbled tracks list
function delete_duplets(tab) {
    // must first load prototype, then jquery, because of silly use of prototype on last.fm page
    chrome.tabs.executeScript(tab.id, {file: "/javascript/resources/prototype.js"}, function(){
        chrome.tabs.executeScript(tab.id, {file: "/javascript/resources/jquery-1.7.2.min.js"}, function(){
            chrome.tabs.executeScript(tab.id, {file:"/javascript/contentscript.js"});
        });
    });
}

// opens a new tab with the given url
function open_new_tab_with_url(url) {
    chrome.tabs.create({"url":url,"selected":true});
}

// for this to work, you will need "permissions": [ "tabs" ] in manifest.json
function change_to_url_or_create(url) {
    // test all tabs for url, if exists then change currently selected tab!
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
        for (var i = 0, tab; tab = tabs[i]; i++) {
            if (tab.url && is_url_right(tab.url)) {
                chrome.tabs.update(tab.id, {selected: true});
                return;
            }
        }
        open_new_tab_with_url(url);
    });
}

function update_settings(){
    saved_settings = $.parseJSON(localStorage["settings"]);
}
