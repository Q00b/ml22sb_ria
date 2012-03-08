define(
	['order!lib/jquery-1.7.1', 'order!lib/underscore', 'order!lib/backbone'],

	function() {
		return {
			run: function() {
				console.log( "fdsf" );
				new this.router;
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					console.log( "routerinit" );
				},

				routes: {
					'': 'index',
					'register': 'register'
				},

				index: function() {
					console.log( "index" );
				},

				register: function() {
					console.log( "register" );
				}
			} )
		}
	}
);
