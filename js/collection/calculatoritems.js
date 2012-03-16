define( ['order!backbone',
		 'order!../auth',
		 'order!../model/calculatoritem'],

	function( Backbone, Auth, CalculatorItemModel ) {
		return Backbone.Collection.extend( {
			model: CalculatorItemModel,

			url: 'php/mongo-calculatoritem.php',

			initialize: function() {
			},

			doFetch: function() {
				this.fetch( { data: { userid: Auth.getUserId() } } );
			}
		} );
	}
);
