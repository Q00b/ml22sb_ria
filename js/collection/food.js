/**
 * @description Food collection.
 */
define( ['order!backbone',
		 'order!../auth',
		 'order!../model/food'],

	function( Backbone, Auth, FoodModel ) {
		return Backbone.Collection.extend( {
			model: FoodModel,

			url: 'php/mongo-food.php',

			/**
			 * @description Calls for a fetch on this collection providing the logged in users id.
			 * @function
			 */
			doFetch: function() {
				this.fetch( { data: { userid: Auth.getUserId() } } );
			}
		} );
	}
);
