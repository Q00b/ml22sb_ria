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
			},

			validate: function( attrs ) {
				// Check if the username is valid.
				if ( !attrs.username.match( /^[A-z0-9_]{4,20}$/i ) ) {
					throw new Error( 'Felaktigt användarnamn (4-20 tecken: A-z 0-9 _).' );
				}

				// Check if the password is valid.
				if ( !attrs.password.match( /^\S{4,20}$/i ) ) {
					throw new Error( 'Felaktigt lösenord (4-20 icke-whitespace tecken).' );
				}
			}
		} );
	}
);
