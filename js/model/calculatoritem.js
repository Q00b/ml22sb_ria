/**
 * @description Calculator Item model. Contains data to be used for the nutrition calculator "rows".
 */
define( ['order!backbone',
		 'order!../model/food'],

	function( Backbone, FoodModel ) {
		return Backbone.RelationalModel.extend( {
			relations: [ {
				type: Backbone.HasOne,
				key: 'food',
				relatedModel: FoodModel,
				includeInJSON: '_id'
			} ],

			idAttribute: '_id',

			urlRoot: 'php/mongo-calculatoritem.php',

			defaults: {
				weight: null,
				food: null,
				user: null
			},

			validate: function( attrs ) {
				// Validate weight value.
				if ( !attrs.weight.match( /^[0-9]+$/i ) ) {
					throw new Error( 'Du måste ange vikt i gram som heltal.' );
				}
			},

			/**
			 * @function
			 * @description Calculates the amount of protein (in grams) depending on the food weight.
			 * @return {Number} Grams of protein found in the food.
			 */
			protein: function() {
				return this.attributes.food ? Math.round( this.attributes.food.attributes.protein * this.attributes.weight * 0.01 ) : 0;
			},

			/**
			 * @function
			 * @description Calculates the amount of carbohydrates (in grams) depending on the food weight.
			 * @return {Number} Grams of carbohydrates found in the food.
			 */
			carbohydrates: function() {
				return this.attributes.food ? Math.round( this.attributes.food.attributes.carbohydrates * this.attributes.weight * 0.01 ) : 0;
			},

			/**
			 * @function
			 * @description Calculates the amount of fat (in grams) depending on the food weight.
			 * @return {Number} Grams of fat found in the food.
			 */
			fat: function() {
				return this.attributes.food ? Math.round( this.attributes.food.attributes.fat * this.attributes.weight * 0.01 ) : 0;
			},

			/**
			 * @function
			 * @description Calculates the amount of energy (in kcal) depending on the food weight and it's nutrition values.
			 * @return {Number} Total amount of energy from the macro-nutrients (protein, carbohydrates and fat) found in the food.
			 */
			energy: function() {
				return this.attributes.food ? Math.round( ( this.protein() * 4.1 + this.carbohydrates() * 4.1 + this.fat() * 9.3 ) * this.attributes.weight * 0.01 ) : 0;
			}
		} );
	}
);
