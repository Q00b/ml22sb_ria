/**
 * @description User model.
 */
define( ['order!backbone'],

	function( Backbone ) {
		return Backbone.Model.extend( {
			idAttribute: '_id',

			urlRoot: 'php/mongo-user.php',

			defaults: {
				username: null,
				password: null
			}
		} );
	}
);
