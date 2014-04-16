$(document).bind( "pagechange", function( e, data ) {
	// Remove page from DOM when it's being replaced => doesn´t work when bound with [$(document).bind("mobileinit",...]
	// @ToDo: let jquery mobile work in a div, then it manages replacement without this tweak
	// => http://demos.jquerymobile.com/1.1.1/docs/pages/page-dynamic.html
	// Event "pagehide" is depricated and will be removed in JQM 1.5
	// NEW impl: http://api.jquerymobile.com/pagecontainer/
	$('div[data-role="page"]').on('pagehide', function (event, ui) {
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
    	if(window.location.hash != '#login' 
    		&& window.location.hash != '#register'
    		&& window.location.hash != '#passwdForgotten'){
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
			console.log('(404) Redirect to login...');    	
			$.session.remove('userdata');
        	window.location.hash = '#login';
        },
    	401: function(){
            // Redirec the to the login page.
        	console.log('(401) Redirect to login...');
        	$.session.remove('userdata');
        	window.location.hash = '#login';
        },
        403: function() {
            // 403 -- Access denied
        	console.log('(403) Redirect to login...');
        	$.session.remove('userdata');
        	window.location.hash = '#login';
        }
    }
});