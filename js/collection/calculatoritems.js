/**
 * @description CalculatorItems Collection.
 */
define( ['order!backbone',
		 'order!../auth',
		 'order!../model/calculatoritem'],

	function( Backbone, Auth, CalculatorItemModel ) {
		return Backbone.Collection.extend( {
			model: CalculatorItemModel,

			url: 'php/mongo-calculatoritem.php',

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
