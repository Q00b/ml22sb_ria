/**
 * @description Users collection.
 */
define( ['order!backbone',
		 'order!../model/user'],

	function( Backbone, UserModel ) {
		return Backbone.Collection.extend( {
			model: UserModel,

			url: 'php/mongo-user.php',

			/**
			 * @description Initializes the collection calling fetch() to populate it.
			 * @function
			 */
			initialize: function() {
				this.fetch();
			}
		} );
	}
);
