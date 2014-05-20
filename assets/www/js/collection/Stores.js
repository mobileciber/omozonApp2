var StoresCollection = Backbone.Collection.extend({
	url: omozonAppConfig.backendApiUrl + '/stores',
	model: Store,

//	localStorage: new Backbone.LocalStorage("omozon-stores"),
	
	initialize: function(){
		console.log("Stores collection initialize");
	}
});