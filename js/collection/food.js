define( ['order!backbone',
		 'order!../auth',
		 'order!../model/food'],

	function( Backbone, Auth, FoodModel ) {
		return Backbone.Collection.extend( {
			model: FoodModel,

			url: 'php/mongo-food.php',

			initialize: function() {
			},

			doFetch: function() {
				this.fetch( { data: { userid: Auth.getUserId() } } );
			}
		} );
	}
);
