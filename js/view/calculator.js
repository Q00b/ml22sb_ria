define( ['order!jQuery', 'order!underscore', 'order!backbone', 'order!../auth', 'order!../view/food', 'order!../view/calculatoritems'],

	function( $, _, Backbone, Auth, FoodView, CalculatorItemsView ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#calculator-template' ).html() ),

			initialize: function() {
				this.foodView = new FoodView();
				this.calculatorItemsView = new CalculatorItemsView();
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut() } ) );

				if ( !Auth.isLoggedOut() ) {
					$( this.el ).append( $( this.foodView.render().el ) );
					$( this.el ).append( $( this.calculatorItemsView.render().el ) );
				}
			}
		} );
	}
);
