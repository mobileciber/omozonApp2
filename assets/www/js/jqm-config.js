$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.listview.prototype.options.icon = "";
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

    // Remove page from DOM when it's being replaced
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
        $(event.currentTarget).remove();
    });
});

// Check with following link for more jquery page lifecycle events
// http://www.gajotres.net/page-events-order-in-jquery-mobile/
$(document).on('pagebeforecreate', '[data-role="page"]', function(){    
    console && console.log($.session.get('userdata') + " - pagebeforecreate!!");
    if(typeof $.session.get('userdata') == 'undefined'){
    	// we don´t want a redirect in case of loading the login or on logout page
    	if(window.location.hash != 'login' && window.location.hash != 'logout'){
    		window.location.hash = 'login';
    	}
	}
});

//Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
$.ajaxSetup({
    statusCode: {
        401: function(){
            // Redirec the to the login page.
        	$.session.remove('userdata');
        	window.location.hash = 'login';
        },
        403: function() {
            // 403 -- Access denied
        	$.session.remove('userdata');
        	window.location.hash = 'login';
        }
    }
});