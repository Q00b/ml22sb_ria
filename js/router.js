define( ['order!jQuery', 'order!underscore', 'order!backbone', 'view/registration'], function( $, _, Backbone, RegistrationView ) {
	return {
		run : function() {
			new this.router();
			Backbone.history.start();
		},

		router : Backbone.Router.extend( {
			routes : {
				'' : 'index',
				'register' : 'register'
			},

			index : function() {
				console.log( "index" );
			},

			register : function() {
				new RegistrationView();
			}
		} )
	}
} );
