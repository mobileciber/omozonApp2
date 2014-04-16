$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.listview.prototype.options.icon = "";
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});