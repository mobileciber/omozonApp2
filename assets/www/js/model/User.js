/**
 * Created with JetBrains WebStorm.
 * User: heiko
 * Date: 10.02.14
 * Time: 21:25
 * To change this template use File | Settings | File Templates.
 */
var User = Backbone.Model.extend({
	urlRoot: omozonAppConfig.backendApiUrl + '/customers',
//	urlRoot: 'http://freddy:krueger@192.168.0.104:8484/hybridmobile-backend/api/customers',
	
	validation: {
        id: {
            required: true,
            msg: 'Please enter an username'
        },
        email: {
            required: true,
            pattern: 'email',
            msg: 'Please enter a valid email address'
        },
        password: [{
	    		required: true,
	    		msg: 'Please enter a password'
		    },
		    {
		    	minLength: 4,
				msg: 'Please enter a password min. 4 digits long'
	    }],
        repeatPassword: {
            equalTo: 'password',
            msg: 'The passwords does not match'
        },
        name: {
            required: true,
            msg: 'Please enter your first- and familyname'
        },
        street: {
            required: true,
            msg: 'Please enter a street'
        },
        zip: {
            pattern: 'digits',
            msg: 'Please enter a valid ZIP code'
        },
        city: {
            required: true,
            msg: 'Please enter a city'
        }
//        country: {
//          oneOf: ['Norway', 'Sweeden']
//        },
//        gender: {
//            required: true
//        },
//        age: {
//            required: false,
//            range: [18, 100]
//        },
//        terms: {
//            acceptance: true
//        }
    },

    defaults: {
        id: '',
        passwd: '',
        email: '',
        name: '',
        street: '',
        zip: '',
        city: ''
    }
});
