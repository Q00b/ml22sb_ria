/**
 * @description Food model. Contains data for users food stored in the application.
 */
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
			},

			validate: function( attrs ) {
				// Validate food name.
				if ( !attrs.foodname.match( /^\S+(.+\S+)?$/i ) ) {
					return 'Vänligen ange ett livsmedelsnamn. (Kan ej börja eller sluta med white-space-tecken.)';
				}

				// Validate nutrition values.
				if ( !attrs.protein.match( /^[0-9]+$/i ) || !attrs.carbohydrates.match( /^[0-9]+$/i ) || !attrs.fat.match( /^[0-9]+$/i ) ) {
					return 'Vänligen ange siffror för mängd makronutrienter.';
				}
			}
		} );
	}
);
