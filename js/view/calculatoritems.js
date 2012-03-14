define( ['order!jQuery', 'order!underscore', 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			el: $( '#calculator-items-container' ),
			template: _.template( $( '#calculator-items-template' ).html() ),

			initialize: function() {
			},

			render: function() {
				this.el = $( '#calculator-items-container' );
				$( this.el ).html( this.template() );
			},

			events: {
				'click #calculator-update': 'updateCalculatorItems'
			},

			updateCalculatorItems: function() {
				console.log( "update calculator items" );
			}
		} );
	}
);
