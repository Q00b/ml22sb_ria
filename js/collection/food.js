define( ['order!backbone', 'order!../auth', 'order!../model/food'],

	function( Backbone, Auth, FoodModel ) {
		return Backbone.Collection.extend( {
			model : FoodModel,
			url : 'php/mongo-user.php?userid=' + Auth.getUserId()
		} );
	}
);
