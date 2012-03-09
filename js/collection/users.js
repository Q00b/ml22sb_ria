define( ['order!backbone', '../model/user'], function( Backbone, UserModel ) {
	return Backbone.Collection.extend( {
		model : UserModel,

		url : 'php/mongo-user.php',

		initialize : function() {
			this.fetch();
		}
	} );
} );
