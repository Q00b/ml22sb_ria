define( ['order!jQuery', 'order!underscore', 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			el: $( '#food-container' ),

			initialize: function() {
				this.template = _.template( $( '#food-template' ).html() );
			},

			render: function() {
				this.el = $( '#food-container' );
				$( this.el ).html( this.template() );
			},

			events: {
				'click #create-food': 'createFood',
				'click #use-food': 'useFood',
				'click #use-food-delete': 'deleteFood'
			},

			createFood: function( e ) {
				e.preventDefault();
			},

			useFood: function( e ) {
				e.preventDefault();
			},

			deleteFood: function( e ) {
				e.preventDefault();
			}
		} );
	}
);
