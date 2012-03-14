define( ['order!jQuery', 'order!underscore', 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			el: $( '#calculator-items-container' ),

			initialize: function() {
				this.template = _.template( $( '#calculator-items-template' ).html() );
			},

			render: function() {
				this.el = $( '#calculator-items-container' );
				$( this.el ).html( this.template() );
			}
		} );
	}
);
