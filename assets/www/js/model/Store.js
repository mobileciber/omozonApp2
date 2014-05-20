var Store = Backbone.Model.extend({
	// use collection.url instead!
	//url: omozonAppConfig.backendApiUrl + '/stores',
	defaults: {
		name: '',
		openingTimes: ''
	},
	initialize: function(){
		console.log("Store model initialize");
	}
});