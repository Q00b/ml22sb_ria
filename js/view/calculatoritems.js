define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth',
		 'order!calculate'],

	function( $, _, Backbone, Auth, Calc ) {
		return Backbone.View.extend( {
			tagName: 'div',
			id: 'calculator-items-container',
			template: _.template( $( '#calculator-items-template' ).html() ),

			initialize: function( options ) {
				this.userCollection = options.userCollection;
				this.foodCollection = options.foodCollection;

				this.collection.on( 'reset', this.render, this );
				this.collection.on( 'add', this.collection.fetch, this.collection );
			},

			render: function() {
				$( this.el ).html( this.template( { calculatorItems: this.collection.models, calc: Calc } ) );
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
