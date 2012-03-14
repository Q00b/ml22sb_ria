define( ['order!jQuery', 'order!underscore', 'order!backbone', 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			logout: function() {
				Auth.logout();
				console.log( "Successfully logged out!" );
				Backbone.history.navigate( '', { trigger: true } );
			}
		} );
	}
);
