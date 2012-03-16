/**
 * @description Login view. Displays and handles a user login form.
 */
define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth'],

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

			/**
			 * @function
			 * @description Try to login the user. If the login data passes validation the user will be logged in.
			 */
			login: function( e ) {
				var loginName = '',
					loginPw = '',
					user = {};

				e.preventDefault();

				try {
					loginName = $( '#login-name' ).val();
					loginPw = $( '#login-pw' ).val();

					// Validate the username.
					if ( !loginName || !loginName.match( /^[A-z0-9_]{4,20}$/i ) ) {
						throw new Error( 'Felaktigt användarnamn.' );
					}

					// Validate the password.
					if ( !loginPw || !loginPw.match( /^\S{4,20}$/i ) ) {
						throw new Error( 'Felaktigt lösenord.' );
					}

					// Check if the user exists in the collection.
					user = _.find( this.collection.models, function( cmp_user ) {
						if ( cmp_user.attributes.username == loginName ) {
							return cmp_user;
						}
					} );

					// Check if the username + password combo matches.
					if ( !user || user.attributes.username !== loginName || user.attributes.password !== loginPw ) {
						throw new Error( 'Felaktigt användarnamn eller lösenord.' );
					}

					// Login the user.
					Auth.login( user.id );

					Backbone.history.navigate( '', { trigger: true } );
				} catch ( er ) {
					console.log( "Could not login: " + er.message );
				}
			}
		} );
	}
);
