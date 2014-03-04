//window.HomeView = Backbone.View.extend({
//    // 'this' means 'window', which is the default global object
//    // 'bindAll' uses 'bind' internally and 'bind' uses 'apply', which sets the value for 'this'
//    template:_.template($('#home').html()),
//
//    render:function (eventName) {
//        $(this.el).html(this.template());
//        return this;
//    }
//});

window.HomeView = Backbone.View.extend({
    // 'this' means 'window', which is the default global object
    // 'bindAll' uses 'bind' internally and 'bind' uses 'apply', which sets the value for 'this'
	initialize: function() {
//        _.bindAll(this, "render");
//        this.model.bind("change", this.render);
//        this.model.fetch();
    },
    
    render:function () {
//        var greeting = 'Hello ' + this.options.name + ' (' + this.options.age + '), father of ' + this.options.child;
//    	this.options keeps all parameters with which the view was instanciated
    	var sessionUser = $.parseJSON($.session.get('userdata'));
    	var greeting = 'Hello ' + sessionUser.name;
        //Pass variables in using Underscore.js Template
        var variables = { myGreeting: greeting };
        // Compile the template using underscore
        var template = _.template( $('#home').html(), variables );
        // Load the compiled HTML into the Backbone "el"
        $(this.el).html( template );
//      fire the JQM create trigger to refresh the page
        return $(this.el).trigger('create');
    }
    
//    
//
//    render: function() {
//        $(this.el).html(Mustache.to_html($('#template').html(), this.model.toJSON());
//        return this;
//    }
});

window.LoginView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Login View');
    },

    events: {
        "click #loginButton": "login"
    },

    template:_.template($('#login').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    login:function (event) {
    	var self = this;
    	var username = $('#inputEmail').val();
    	var password = $('#inputPassword').val();
    	var user = new User({id: username});
		user.credentials = function(){
			return {
				username: username,
				password: password
			};
		};
		console.log(username + " / " + password);
		user.fetch({
//				data: {},
				success: function (usermodel, response, options) {
					usermodel.set({ username: username, password: password});
					console.log('Put user in session: ' + JSON.stringify(usermodel.toJSON()));
					$.session.set('userdata', JSON.stringify(usermodel.toJSON()));
					
					console.log(usermodel.get('name') + " has signed on");
					console.log(usermodel.get('username') + " / " + usermodel.get('password'));
					self.redirect(usermodel);
                },
                error:function (model, xhr, options) {
                	console.log('error arguments: ', arguments);
//                	var serializer = new ONEGEEK.GSerializer();
//                	var serializedObj = serializer.serialize(options, 'model');
//                	console.log('Remove user from session...' + serializedObj);
                	$.session.remove('userdata');
//                    alert(' Service request failure: ' + e);
                },
                complete: function(xhr, textStatus) {
                	console.log('fetch status: ' + textStatus);
                }
		});
//		.complete(function () {
//	        alert("done");
//	    });
    },
    
    redirect: function(usermodel){
    	app.changePage(new HomeView());
    }
});

window.LogoutView = Backbone.View.extend({

    template:_.template($('#logout').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.StoresView = Backbone.View.extend({

    template:_.template($('#stores').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.StoreListView = Backbone.View.extend({

    template:_.template($('#storeList').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.StoreDetailsView = Backbone.View.extend({

    template:_.template($('#storeDetails').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.StoreOffersView = Backbone.View.extend({

    template:_.template($('#storeOffers').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.StoreOfferListView = Backbone.View.extend({

    template:_.template($('#storeOfferList').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.ProductDetailsView = Backbone.View.extend({

    template:_.template($('#productDetails').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.ProductDetailsQRView = Backbone.View.extend({

    template:_.template($('#productDetailsQR').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.ProductSearchView = Backbone.View.extend({

    template:_.template($('#productSearch').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.ProductSearchResultView = Backbone.View.extend({

    template:_.template($('#productSearchResult').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonView = Backbone.View.extend({

    template:_.template($('#myOmozon').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonStoresView = Backbone.View.extend({

    template:_.template($('#myOmozonStores').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonProfileView = Backbone.View.extend({

    template:_.template($('#myOmozonProfile').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonPurchasesView = Backbone.View.extend({

    template:_.template($('#myOmozonPurchases').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonWishlistView = Backbone.View.extend({

    template:_.template($('#myOmozonWishlist').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonWalletView = Backbone.View.extend({

    template:_.template($('#myOmozonWallet').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonVoucherView = Backbone.View.extend({

    template:_.template($('#myOmozonVoucher').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.MyOmozonCoinsView = Backbone.View.extend({

    template:_.template($('#myOmozonCoins').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.OnlineshopView = Backbone.View.extend({

    template:_.template($('#onlineshop').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "login":"login",
        "logout":"logout",
        "stores":"stores",
        "storeList":"storeList",
        "storeDetails":"storeDetails",
        "storeOffers":"storeOffers",
        "storeOfferList":"storeOfferList",
        "productDetails":"productDetails",
        "productDetailsQR":"productDetailsQR",
        "productSearch":"productSearch",
        "productSearchResult":"productSearchResult",
        "myOmozon":"myOmozon",
        "myOmozon/stores":"myOmozonStores",
        "myOmozon/profile":"myOmozonProfile",
        "myOmozon/purchases":"myOmozonPurchases",
        "myOmozon/wishlist":"myOmozonWishlist",
        "myOmozon/wallet":"myOmozonWallet",
        "myOmozon/wallet/voucher":"myOmozonVoucher",
        "myOmozon/wallet/coins":"myOmozonCoins",
        "onlineshop":"onlineshop"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
//        var user = new User();
//        user.set({id: 'freddy'}); // without an id backbone will not fetch data from backend
//        
//        var username = '';
//        var password = '';
        
        if(typeof $.session.get('userdata') != 'undefined'){
        	var sessionUser = $.parseJSON($.session.get('userdata'));
        	console.log('User from JSON: ' + sessionUser.name);
        	var user = new User();
        	user.set({id: sessionUser.username});
        	username = sessionUser.username;
            password = sessionUser.password;
            console.log(username + " / " + password);    		
        } 
//        else{
//        	this.changePage(new LoginView());
//        }
        this.changePage(new HomeView());
//        user.credentials = function(){
//			return {
//				username: username,
//				password: password
//			};
//		};
//        this.changePage(new HomeView({model : user}));
    },
    
    login: function() {
    	console.log('#login');
        this.changePage(new LoginView());
    },
    
    logout: function() {
    	console.log('#logout');
    	$.session.remove('userdata');
        this.changePage(new LogoutView());
    },

    stores:function () {
        console.log('#stores');
        this.changePage(new StoresView());
    },
    
    storeList:function () {
        console.log('#storeList');
        this.changePage(new StoreListView());
    },
    
    storeDetails:function () {
        console.log('#storeDetails');
        this.changePage(new StoreDetailsView());
    },

    storeOffers:function () {
        console.log('#storeOffers');
        this.changePage(new StoreOffersView());
    },
    
    storeOfferList:function () {
        console.log('#storeOfferList');
        this.changePage(new StoreOfferListView());
    },
    
    productDetails:function () {
        console.log('#productDetails');
        this.changePage(new ProductDetailsView());
    },
    
    productDetailsQR:function () {
        console.log('#productDetailsQR');
        this.changePage(new ProductDetailsQRView());
    },
    
    productSearch:function () {
        console.log('#productSearch');
        this.changePage(new ProductSearchView());
    },
    
    productSearchResult:function () {
        console.log('#productSearchResult');
        this.changePage(new ProductSearchResultView());
    },

    myOmozon:function () {
        console.log('#myOmozon');
        this.changePage(new MyOmozonView());
    },
    
    myOmozonStores:function () {
        console.log('#myOmozonStores');
        this.changePage(new MyOmozonStoresView());
    },
    
    myOmozonProfile:function () {
        console.log('#myOmozonProfile');
        this.changePage(new MyOmozonProfileView());
    },
    
    myOmozonPurchases:function () {
        console.log('#myOmozonPurchases');
        this.changePage(new MyOmozonPurchasesView());
    },
    
    myOmozonWishlist:function () {
        console.log('#myOmozonWishlist');
        this.changePage(new MyOmozonWishlistView());
    },
    
    myOmozonWallet:function () {
        console.log('#myOmozonWallet');
        this.changePage(new MyOmozonWalletView());
    },
    
    myOmozonVoucher:function () {
        console.log('#myOmozonVoucher');
        this.changePage(new MyOmozonVoucherView());
    },
    
    myOmozonCoins:function () {
        console.log('#myOmozonCoins');
        this.changePage(new MyOmozonCoinsView());
    },
    
    onlineshop:function () {
        console.log('#onlineshop');
        this.changePage(new OnlineshopView());
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});