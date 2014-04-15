var LoginForm = Backbone.Model.extend({
	// this code requies Backbone.Validation plugin
//	validation: {
//		inputEmail: [{
//	      required: true,
//	      msg: 'Please enter an email address'
//	    },{
//	      pattern: 'email',
//	      msg: 'Please enter a valid email'
//	    }],
//	    inputPassword: [{
//	    		required: true,
//	    		msg: 'Please enter a password'
//		    },{
//		    	length: 4,
//		    	msg: 'Please enter a password longer than 4 characters'
//		    }]
//	  }
	
	defaults: {
		'inputUser': '',
		'inputPassword': ''

	},
	
	validate: function (attrs, options) {
		if (!attrs.inputEmail) {
			return 'Please fill email field.';
		}
		if (!attrs.inputPassword) {
			return 'Please fill password field.';
		}
	}
});