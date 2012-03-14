define( ['order!jQuery', 'order!underscore', 'order!backbone', 'order!../auth', 'order!../view/food', 'order!../view/calculatoritems'],

	function( $, _, Backbone, Auth, FoodView, CalculatorItemsView ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#calculator-template' ).html() ),

			initialize: function() {
				this.foodView = new FoodView( { el:  $( '#food-container' ) } );
				this.calculatorItemsView = new CalculatorItemsView( { el: $( '#calculator-items-container' ) } );
				$( this.el ).append( this.foodView.$el );
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut() } ) );
				this.foodView.render();
				this.calculatorItemsView.render();
			},

			events: {
				'click #calculator-update' : 'updateCalculatorItems'
			},

			updateCalculatorItems: function( e ) {
				e.preventDefault();
				console.log( "update calculator items" );
			}
		} );
	}
);
