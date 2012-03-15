define( ['order!backbone',
		 'order!../model/food'],

	function( Backbone, FoodModel ) {
		return Backbone.Collection.extend( {
			model: FoodModel,

			url: 'php/mongo-food.php',

			initialize: function() {
				this.fetch();
			}
		} );
	}
);
