define( ['order!backbone'],

	function( Backbone ) {
		return Backbone.Model.extend( {
			idAttribute: '_id',

			url: 'php/mongo-food.php',

			defaults: {
				name: null,
				protein: null,
				carbohydrates: null,
				fat: null
			}
		} );
	}
);
