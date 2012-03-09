define( ['order!backbone'],

	function( Backbone ) {
		return Backbone.Model.extend( {
			idAttribute: '_id',

			url: 'php/mongo-user.php',

			defaults: {
				username: null,
				password: null
			}
		} );
	}
);
