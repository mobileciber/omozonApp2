/**
 * Created with JetBrains WebStorm.
 * User: heiko
 * Date: 10.02.14
 * Time: 22:12
 * To change this template use File | Settings | File Templates.
 */
Person = Backbone.Model.extend({
    defaults: {
        name: 'Fetus',
        age: 0,
        child: ''
    },
    initialize: function(){
        // alert("Welcome to this world");
    }
});
