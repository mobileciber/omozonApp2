var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		done: false
	},
	initialize: function(){
		console.log("Todo model initialize");
	}
});