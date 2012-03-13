define( ['order!jQuery', 'order!underscore', 'order!backbone', '../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#content' ),

			initialize: function() {
				this.collection.bind( 'reset', this.render, this );
				this.collection.bind( 'add', this.render, this );

				this.template = _.template( $( '#login-template' ).html() );
			},

			render: function() {
				$( this.el ).html( this.template() );
			},

			events: {
				'click #login': 'login'
			},

			login: function( e ) {
				e.preventDefault();

				try {
					var loginName = $( '#login-name' ).val();
					var loginPw = $( '#login-pw' ).val();

					if ( !loginName || !loginName.match( /^[A-z0-9_]{4,20}$/i ) ) {
						throw new Error( 'Felaktigt användarnamn.' );
					}

					if ( !loginPw || !loginPw.match( /^\S{4,20}$/i ) ) {
						throw new Error( 'Felaktigt lösenord.' );
					}

					var user = _.find( this.collection.models, function( cmp_user ) {
						if ( cmp_user.attributes.username == loginName ) {
							return cmp_user;
						}
					} );

					if ( !user || user.attributes.username !== loginName || user.attributes.password !== loginPw ) {
						throw new Error( 'Felaktigt användarnamn eller lösenord.' );
					}

					Auth.login( user.id );

					console.log( "Successfully logged in!" );

					Backbone.history.navigate( '', { trigger: true } );
				} catch ( er ) {
					console.log( "Could not login: " + er.message );
				}
			}
		} );
	}
);
