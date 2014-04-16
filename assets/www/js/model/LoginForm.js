var LoginFormModel = Backbone.Model.extend({
	validation: {
		inputUser: {
	      required: true,
	      msg: 'Please enter an user name'
	    },
	    inputPassword: [{
	    		required: true,
	    		msg: 'Please enter a password'
		    },
		    {
		    	minLength: 4,
				msg: 'Please enter a password longer than 4 digits'
		    }]
	  },
	
	defaults: {
		'inputUser': '',
		'inputPassword': ''

	}
});