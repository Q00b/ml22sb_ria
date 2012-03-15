define( ['order!backbone'],

	function( Backbone ) {
		return Backbone.RelationalModel.extend( {
			idAttribute: '_id',

			urlRoot: 'php/mongo-food.php',

			defaults: {
				foodname: null,
				protein: null,
				carbohydrates: null,
				fat: null,
				user: null
			}
		} );
	}
);
