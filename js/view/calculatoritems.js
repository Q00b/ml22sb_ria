define( ['order!jQuery', 'order!underscore', 'order!backbone', '../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#calculator-items-container' ),

			initialize: function() {
				this.template = _.template( $( '#calculator-template' ).html() );
			},

			render: function() {
				this.el = $( '#calculator-items-container' );
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut() } ) );
			},

			events: {
				'click #create-food': 'createFood',
				'click #use-food': 'useFood',
				'click #use-food-delete': 'deleteFood',
				'click #calculator-update': 'updateCalculatorItems'
			},

			createFood: function( e ) {
				e.preventDefault();
			},

			useFood: function( e ) {
				e.preventDefault();
			},

			deleteFood: function( e ) {
				e.preventDefault();
			},

			updateCalculatorItems: function( e ) {
				e.preventDefault();
			}
		} );
	}
);
