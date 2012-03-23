/**
 * @description A Backbone collection containing calculatoritem models.
 */
define( ['order!backbone',
		 'order!underscore',
		 'order!../auth',
		 'order!../model/calculatoritem'],

	function( Backbone, _, Auth, CalculatorItemModel ) {
		return Backbone.Collection.extend( {
			model: CalculatorItemModel,

			url: 'php/mongo-calculatoritem.php',

			/**
			 * @description Calls for a fetch on this collection providing the logged in users id.
			 * @function
			 */
			doFetch: function() {
				this.fetch( { data: { userid: Auth.getUserId() } } );
			},

			/**
			 * @function
			 * @description Calculates the nutrition value totals from all calculator items.
			 * @param {Object} foodCollection Food used in the calculator items models.
			 */
			totals: function() {
				var that = this,
					protein = 0,
					carbohydrates = 0,
					fat = 0,
					energy = 0;

				_.each( this.models, function( calculatorItem ) {
					protein += calculatorItem.protein();
					carbohydrates += calculatorItem.carbohydrates();
					fat += calculatorItem.fat();
					energy += calculatorItem.energy();
				} );

				return { protein: protein, carbohydrates: carbohydrates, fat: fat, energy: energy };
			},
		} );
	}
);
