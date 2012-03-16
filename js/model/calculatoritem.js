define( ['order!backbone', 'order!../auth', 'order!../model/food' ],

	function( Backbone, Auth, FoodModel ) {
		return Backbone.RelationalModel.extend( {
			relations: [{
				type: Backbone.HasOne,
				key: 'food',
				relatedModel: FoodModel
			}],

			idAttribute: '_id',

			urlRoot: 'php/mongo-calculatoritem.php',

			defaults: {
				weight: null,
				food: null,
				user: null
			}
		} );
	}
);
