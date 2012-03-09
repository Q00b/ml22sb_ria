define( ['order!backbone'], function( Backbone ) {
	return Backbone.Model.extend( {
		idAttribute : '_id',

		url : 'php/mongo-user.php',

		defaults : {
			_id : null,
			username : null,
			password : null
		},

		initialize : function() {
			this.bind( 'error', function( model, error ) {
				throw new Error( error );
			} );
		}
	} );
} );
