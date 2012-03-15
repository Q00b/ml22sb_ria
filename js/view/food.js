define( ['order!jQuery', 'order!underscore', 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			tagName: 'div',
			id: 'food-container',
			template: _.template( $( '#food-template' ).html() ),

			initialize: function() {
			},

			render: function() {
				$( this.el ).html( this.template() );
				return this;
			},

			events: {
				'click #create-food': 'createFood',
				'click #use-food': 'useFood',
				'click #use-food-delete': 'deleteFood'
			},

			createFood: function( e ) {
				e.preventDefault();
				console.log( "create food" );
			},

			useFood: function( e ) {
				e.preventDefault();
				console.log( "use food" );
			},

			deleteFood: function( e ) {
				e.preventDefault();
				console.log( "delete food" );
			}
		} );
	}
);
