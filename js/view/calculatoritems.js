define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			tagName: 'div',
			id: 'calculator-items-container',
			template: _.template( $( '#calculator-items-template' ).html() ),

			initialize: function( options ) {
				this.userCollection = options.userCollection;
				this.foodCollection = options.foodCollection;
			},

			render: function() {
				$( this.el ).html( this.template( { calculatorItems: this.itemsCollection } ) );
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
