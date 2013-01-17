// todo : this must be set in an optionspage
var lastfm_username = "your_username";

// todo : must be set in options page as well, select-box with all siteaccesses
// must be set to your siteaccess, won't work otherwise
var lastfm_trackurl = "http://www.lastfm.de/user/" + lastfm_username + "/tracks";

// fired when the button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // 
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
    if (url.indexOf(lastfm_trackurl)>-1){
        return true;
    } else {
        return false;
    }
}

// logic for deleting double entries in LastFM scrobbled tracks list
function delete_duplets(tab) {
    // must first load prototype, then jquery, because of silly use of prototype on last.fm page
    chrome.tabs.executeScript(tab.id, {file: "resources/prototype.js"}, function(){
        chrome.tabs.executeScript(tab.id, {file: "resources/jquery-1.7.2.min.js"}, function(){
            chrome.tabs.executeScript(tab.id, {file:"contentscript.js"});
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