define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			logout: function() {
				Auth.logout();
				Backbone.history.navigate( '', { trigger: true } );
			}
		} );
	}
);
