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
    console.log(window.location + " - pagebeforecreate!!");
//    console.log($.session.get('userdata') + " - pagebeforecreate!!");
    if(typeof $.session.get('userdata') == 'undefined'){
    	console.log('No session user...');
    	// we don´t want a redirect in case of loading the login or on logout page
    	console.log(window.location.hash + " - pagebeforecreate!!");
    	if(window.location.hash != '#login' /*&& window.location.hash != '#logout'*/){
    		console.log('Redirect to login...');
    		window.location.hash = '#login';
    	}
	}
});

// Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
$.ajaxSetup({
    statusCode: {
    	404: function(){ // @ToDo: replace with a sorry page
            // Redirec the to the login page.
        	$.session.remove('userdata');
        	window.location.hash = '#login';
        },
    	401: function(){
            // Redirec the to the login page.
        	$.session.remove('userdata');
        	window.location.hash = '#login';
        },
        403: function() {
            // 403 -- Access denied
        	$.session.remove('userdata');
        	window.location.hash = '#login';
        }
    }
});