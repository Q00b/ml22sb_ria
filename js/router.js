define( ['order!jQuery', 'order!underscore', 'order!backbone', 'auth', 'view/registration', 'view/login'], function( $, _, Backbone, Auth, RegistrationView, LoginView ) {
	return {
		run : function() {
			new this.router();
			Backbone.history.start();
		},

		router : Backbone.Router.extend( {
			routes : {
				'' : 'index',
				'register' : 'register',
				'login' : 'login'
			},

			index : function() {
				console.log( "index" );
			},

			register : function() {
				new RegistrationView();
			},

			login : function() {
				new LoginView();
			}
		} )
	}
} );
