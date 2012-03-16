/**
 * @description Provides functions for calculating nutrition data.
 */
define( [],
	
	function() {
		return {
			/**
			 * @function
			 * @description Calculates the amount (in grams) of nutrient in a food.
			 * @param {Number} weight The weight of the food to calculate on.
			 * @param {Number} nutrient The amount of nutrients in grams per 100 gram food.
			 * @return {Number} The part of the food weight consisting of the nutrient.
			 */
			nutrientWeight: function( weight, nutrient ) {
				return Math.round( weight * 0.01 * nutrient );
			},

			/**
			 * @function
			 * @description Calculates the amount (in kcal) of energy in a food.
			 * @param {Number} weight The weight of the food to calculate on.
			 * @param {Number} protein The amount of protein in grams per 100 gram food.
			 * @param {Number} carbohydrates The amount of carbohydrates in grams per 100 gram food.
			 * @param {Number} fat The amount of fat in grams per 100 gram food.
			 * @return {Number} Total amount of energy from the macro-nutrients found in the food.
			 */
			energy: function( weight, protein, carbohydrates, fat ) {
				return Math.round( ( protein * 4.1 + carbohydrates * 4.1 + fat * 9.3 ) * weight * 0.01 );
			}
		};
	}
);
