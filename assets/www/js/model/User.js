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

    defaults: {
        id: '',
        city: '',
        email: '',
        name: '',
        street: '',
        zip: ''
    }
});

//var user = new User();
//user.credentials = function() {
//    return {
//        username: 'freddy',
//        password: 'krueger'
//    };
//};
//alert(user.fetch());
