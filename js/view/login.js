define( ['order!jQuery', 'order!underscore', 'order!backbone', 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#login-template' ).html() ),

			initialize: function() {
			},

			render: function() {
				$( this.el ).html( this.template() );
			},

			events: {
				'click #login': 'login'
			},

			login: function( e ) {
				var loginName = '',
					loginPw = '',
					user = {};

				e.preventDefault();

				try {
					loginName = $( '#login-name' ).val();
					loginPw = $( '#login-pw' ).val();

					if ( !loginName || !loginName.match( /^[A-z0-9_]{4,20}$/i ) ) {
						throw new Error( 'Felaktigt användarnamn.' );
					}

					if ( !loginPw || !loginPw.match( /^\S{4,20}$/i ) ) {
						throw new Error( 'Felaktigt lösenord.' );
					}

					user = _.find( this.collection.models, function( cmp_user ) {
						if ( cmp_user.attributes.username == loginName ) {
							return cmp_user;
						}
					} );

					if ( !user || user.attributes.username !== loginName || user.attributes.password !== loginPw ) {
						throw new Error( 'Felaktigt användarnamn eller lösenord.' );
					}

					Auth.login( user.id );

					Backbone.history.navigate( '', { trigger: true } );
				} catch ( er ) {
					console.log( "Could not login: " + er.message );
				}
			}
		} );
	}
);
