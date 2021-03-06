//_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

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
var Stores;
var map; 
var marker;
var infoWindow;

window.HomeView = Backbone.View.extend({
    // 'this' means 'window', which is the default global object
    // 'bindAll' uses 'bind' internally and 'bind' uses 'apply', which sets an object as the value for 'this'
	initialize: function() {
//        _.bindAll(this, "render");
//        this.model.bind("change", this.render);
//        this.model.fetch();
//		return $(this.el).trigger('create');
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
//        return $(this.el).trigger('create');
        return this;
    }
});

window.LoginView = Backbone.View.extend({

	initialize: function(){
	    Backbone.Validation.bind(this, {
	        	valid: function(view, attr) {
	        		$('#err_' + attr).html('').hide();
	        		$("#err_loginFailed").html('').hide(); // hide msg for serverside login failed
	     		},
	     		invalid: function(view, attr, error) {
	     			$("#err_" + attr).html(error).show();
	     			$("#err_loginFailed").html('').hide(); // hide msg for serverside login failed
	     		}
	 		}
	    );
	},

	events: {
		"click #loginButton" : function(e){
			this.login(e);
		}
	},

    template:_.template($('#login').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    login:function (e) {
    	var self = this;
    	
    	this.model.set({inputUser: $('#inputUser').val(), inputPassword: $('#inputPassword').val()});
    	
    	if (this.model.isValid(true)) {
    		//alert("Validation successful... You can invoke some serverside login!");
    		this.performLogin(this.model.get("inputUser"), this.model.get("inputPassword"), self);
    	} else{
    		e.preventDefault(); // stops further event propagation
    	}
    },
    
    performLogin: function(username, password){
    	var user = new User({id: username});
		user.credentials = function(){
			return {
				username: username,
				password: password
			};
		};
		console.log('trying to fetch user with name: ' + username);
		console.log('urlRoot: ' + user.urlRoot);
		user.fetch({
				success: function (usermodel, response, options) {
					usermodel.set({ username: username, password: password});
					$.session.set('userdata', JSON.stringify(usermodel.toJSON()));
					console.log(usermodel.get('name') + " has signed on");
					app.navigate("home", {trigger: true});
                },
                error:function (model, xhr, options) {
                	console.log('error arguments: ', options);
                	console.log('Remove user from session...');
                	$.session.remove('userdata');
                	$("#err_loginFailed").html("User / password combination unknown. Please try again.").show();
                },
                complete: function(xhr, textStatus) {
                	console.log('fetch status: ' + textStatus);
                	username = '';
                	password = '';
                }
		});
//		.complete(function () {
//	        alert("done");
//	    });
    },
    
    redirect: function(){
//    	app.changePage(new HomeView());
//    	app.navigate('login', {trigger: true});
    },
    
    cancel: function(e){
    	e.preventDefault();
        return false;
    }
});

window.LogoutView = Backbone.View.extend({

    template:_.template($('#logout').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.RegisterView = Backbone.View.extend({
	
	initialize: function(){
	    Backbone.Validation.bind(this, {
	        	valid: function(view, attr) {
	        		$('#err_' + attr).html('').hide();
	        		$("#err_registrationFailed").html('').hide(); // hide msg for serverside login failed
	     		},
	     		invalid: function(view, attr, error) {
	     			$("#err_" + attr).html(error).show();
	     			$("#err_registrationFailed").html('').hide(); // hide msg for serverside login failed
	     		}
	 		}
	    );
	},
	
	events: {
		"click #registerButton" : function(e){
			this.register(e);
		}
	},
	
	register:function (e) {
    	var self = this;
    	
    	this.model.set({
    		id: $('#user').val(), 
    		password: $('#password').val(),
    		repeatPassword: $('#repeatPassword').val(),
    		email: $('#email').val(),
    		name: $('#name').val(),
    		street: $('#street').val(),
    		zip: $('#zip').val(),
    		city: $('#city').val()
    	});
    	
    	if (this.model.isValid(true)) {
//    		alert("Validation successful... You can invoke some serverside registration!");
    		this.performRegistation(this.model);
    	} else{
    		e.preventDefault(); // stops further event propagation
    	}
    },
    
    performRegistation: function(user){
		user.credentials = function(){
			return { //@ToDo: expose registration without base auth
				username: "freddy",
				password: "krueger"
			};
		};
		console.log('trying to save user with name: ' + user.get("id"));
		console.log('urlRoot: ' + user.urlRoot);
		user.save({}, {
				success: function (usermodel, response, options) {
					$.session.set('userdata', JSON.stringify(usermodel.toJSON()));
					console.log(usermodel.get('name') + " has signed on");
					app.navigate("home", {trigger: true});
                },
                error:function (model, xhr, options) {
                	console.log('error arguments: ', options);
                	console.log('Remove user from session...');
                	$.session.remove('userdata');
                	$("#err_registrationFailed").html("User already exists. Please try another username.").show();
                },
                complete: function(xhr, textStatus) {
                	console.log('fetch status: ' + textStatus);
                	username = '';
                	password = '';
                }
		});
//		.complete(function () {
//	        alert("done");
//	    });
    },

    template:_.template($('#register').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.PasswdForgottenView = Backbone.View.extend({

    template:_.template($('#passwdForgotten').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.StoreView = Backbone.View.extend({
	tagName: "li",
	className: "storeListItem bgPurple", 
	attributes: {
		"style": "background-image:linear-gradient(#552C87, #552C87);"
	},
	
	template: _.template($('#storeListTemplate').html()),
	
	render: function(){
		console.log("StoreView render");
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});

window.StoresCollectionView = Backbone.View.extend({
	tagName: "ul",

	attributes: { 
		"data-role": "listview",
		"data-inset": true
	},
	
	render: function(){
		console.log("StoresCollectionView render");
		this.collection.each(function(store){
			var storeView = new StoreView({ model: store});
			var elHelp = storeView.render().el;
			this.$el.append(elHelp);
		}, this);
		return this;
	}
});

window.StoresView = Backbone.View.extend({

	initialize: function(){
		//Stores = new StoresCollection([{name: 'store 1', openingTimes: 'mo-fr'}, {name: 'store 2', openingTimes: 'sa-su'}]);
		Stores = new StoresCollection({});
		// this can be refactored to make it reusable
		var sessionUser = $.parseJSON($.session.get('userdata'));
		Stores.credentials = function(){
			return {
				username: sessionUser.username,
    			password: sessionUser.password
			};	
    	};
//		this.listenTo(Stores, 'change', this.updateStoresList);
//		this.listenTo(Stores, 'reset', this.updateStoresList);
		console.log("StoresView initialize");
	},
	
    template:_.template($('#stores').html()),

    updateStoresList: function(){
		console.log("updateStoresList");
		var storesCollectionView = new StoresCollectionView({collection: Stores});
		$(this.el).find('#stores-list').html(storesCollectionView.render().el).trigger('create');
	},
    
    render:function (eventName) {
    	var self = this;
    	Stores.fetch().done(function(){
    		self.updateStoresList();
            return self;
    	});
    	$(self.el).html(self.template());
    }
});

window.StoreDetailsView = Backbone.View.extend({

	initialize : function (options) {
	  this.options = options || {};
	},

    template:_.template($('#storeDetails').html()),

    render:function (eventName) {
    	$(this.el).html(this.template());
        var Str = Stores.get(this.options.storeId);
        var self = this;
        var jsonStr = Str.toJSON();
        var markerText = jsonStr.city + " " + jsonStr.street;
        
        var storeTemplate = _.template($('#storeItemDetails').html(), jsonStr);
		$(this.el).find('#storeFetchDetails').html(storeTemplate);
		
		showMap($(this.el).find('#map_canvas'), jsonStr.latitude, jsonStr.longitude, markerText);
        		
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
        "home":"home",
        "login":"login",
        "logout":"logout",
        "register":"register",
        "passwdForgotten":"passwdForgotten",
        "stores":"stores",
        "storeList":"storeList",
        "storeDetails_:storeId":"storeDetails",
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
//        $('.back').live('click', function(event) {
        $('.back').on('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },
    
    login: function() {
    	console.log('#login');
        this.changePage(new LoginView({model: new LoginFormModel()}));
    },
    
    logout: function() {
    	console.log('#logout');
    	$.session.remove('userdata');
        this.changePage(new LogoutView());
    },
    
    register: function() {
    	console.log('#register');
    	$.session.remove('userdata');
        this.changePage(new RegisterView({model: new User()}));
    },
    
    passwdForgotten: function() {
    	console.log('#passwdForgotten');
    	$.session.remove('userdata');
        this.changePage(new PasswdForgottenView());
    },

    stores:function () {
        console.log('#stores');
        this.changePage(new StoresView());
    },
    
    storeList:function () {
        console.log('#storeList');
        this.changePage(new StoreListView());
    },
    
    storeDetails:function (storeId) {
        console.log('#storeDetails/' + storeId);
        this.changePage(new StoreDetailsView({storeId: storeId}));
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
//    Backbone.history.start({ root: 'file:///android_asset/www/index.html' });
});