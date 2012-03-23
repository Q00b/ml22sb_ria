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
					loginPw = '';

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

					// Check if the user already exists in the user collection.
					if ( !this.collection.find( function( user ) {
						if ( user.attributes.username == loginName && user.attributes.password == loginPw ) {
							Auth.login( user.id );
							Backbone.history.navigate( '', { trigger: true } );
							return true;
						}
					} ) ) {
						throw new Error( 'Felaktigt användarnamn eller lösenord' );
					}
				} catch ( er ) {
					console.log( "Could not login: " + er.message );
				}
			}
		} );
	}
);
