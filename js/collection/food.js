define( ['order!backbone', '../auth', '../model/user'],

	function( Backbone, Auth, UserModel ) {
		return Backbone.Collection.extend( {
			model : UserModel,
			url : 'php/mongo-user.php?userid=' + Auth.getUserId()
		} );
	}
);
