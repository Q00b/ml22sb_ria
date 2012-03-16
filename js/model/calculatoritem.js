/**
 * @description Calculator Item model. Contains data to be used for the nutrition calculator "rows".
 */
define( ['order!backbone', 'order!../model/food' ],

	function( Backbone, FoodModel ) {
		return Backbone.Model.extend( {
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
