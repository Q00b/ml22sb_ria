define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth',
		 'order!../collection/food',
		 'order!../collection/calculatoritems',
		 'order!../view/food',
		 'order!../view/calculatoritems'],

	function( $, _, Backbone, Auth, FoodCollection, CalculatorItemsCollection, FoodView, CalculatorItemsView ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#calculator-template' ).html() ),

			initialize: function( options ) {
				this.userColletion = options.userColletion;
				this.foodCollection = new FoodCollection();
				this.calculatorItemsCollection = new CalculatorItemsCollection();

				this.foodView = new FoodView( { collection: this.foodCollection, userCollection: this.userCollection } );
				this.calculatorItemsView = new CalculatorItemsView( { collection: this.calculatorItemsCollection, userCollection: this.userCollection, foodCollection: this.foodCollection } );
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
