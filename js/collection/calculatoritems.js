define( ['order!backbone',
		 'order!../model/calculatoritem'],

	function( Backbone, CalculatorItemModel ) {
		return Backbone.Collection.extend( {
			model: CalculatorItemModel,

			// url: 'php/mongo-calculatoritem.php',

			initialize: function() {
				// this.fetch();
			}
		} );
	}
);
