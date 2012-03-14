define( ['order!jQuery', 'order!underscore', 'order!backbone', 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),

			initialize: function() {
				this.template = _.template( $( '#calculator-template' ).html() );
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut() } ) );
			}
		} );
	}
);
