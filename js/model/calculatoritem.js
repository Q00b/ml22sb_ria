define( ['order!backbone'],

	function( Backbone ) {
		return Backbone.Model.extend( {
			idAttribute: '_id',

			// url: 'php/mongo-calculatoritem.php',

			defaults: {
				weight: null,
				food: null,
				user: null
			}
		} );
	}
);
