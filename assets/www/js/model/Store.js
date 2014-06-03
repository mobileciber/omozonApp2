var Store = Backbone.Model.extend({
	// use collection.url instead!
	defaults: {
		name: '',
		openingTimes: ''
	},
	initialize: function(){
		console.log("Store model initialize");
	}
});