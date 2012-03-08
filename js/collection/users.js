define( ['order!backbone', 'order!model/user'], function( Backbone, UserModel) {
	return Backbone.Collection.extend( {
		model : UserModel,

		initialize : function() {
			this.fetch();
		},

		url: "php/mongo-user.php"
	} );
} );
