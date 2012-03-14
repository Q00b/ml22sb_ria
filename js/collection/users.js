define( ['order!backbone', 'order!../model/user'],

	function( Backbone, UserModel ) {
		return Backbone.Collection.extend( {
			model: UserModel,

			url: 'php/mongo-user.php',

			initialize: function() {
				this.onResetCallbacks = [];
				this.on( 'reset', this.collectionReset, this );
				this.on( 'add', this.fetch, this );
				this.fetch();
			},

			collectionReset: function() {
				if ( !this.collectionLoaded ) {
					this.collectionLoaded = true
				}

				this.fireResetCallbacks();
			},

			onReset: function( callback ) {
				this.onResetCallbacks.push( callback );
				this.collectionLoaded && this.fireResetCallbacks();
			},

			fireResetCallbacks: function() {
				var callback = this.onResetCallbacks.pop();
				if ( callback ) {
					callback( this );
					this.fireResetCallbacks();
				}
			}
		} );
	}
);
