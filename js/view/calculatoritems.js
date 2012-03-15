define( ['order!jQuery', 'order!underscore', 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			tagName: 'div',
			id: 'calculator-items-container',
			template: _.template( $( '#calculator-items-template' ).html() ),

			initialize: function() {
			},

			render: function() {
				$( this.el ).html( this.template() );
				return this;
			},

			updateCalculatorItems: function( e ) {
				e.preventDefault();
				console.log( "update calculator items." );
			},

			events: {
				'click #calculator-update' : 'updateCalculatorItems'
			},

			updateCalculatorItems: function( e ) {
				e.preventDefault();
				console.log( "Update Items True" );
			}
		} );
	}
);
