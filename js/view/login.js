define( ['order!jQuery', 'order!underscore', 'order!backbone', '../auth', '../collection/users'], function( $, _, Backbone, Auth, UserCollection ) {
	return Backbone.View.extend( {
		el: $( '#login' ),

		initialize : function() {
			this.collection = new UserCollection();
			this.collection.bind( 'reset', this.render, this );
			this.collection.bind( 'add', this.render, this );

			this.loginTemplate = _.template( $( '#login-template' ).html() );
			this.logoutTemplate = _.template( $( '#logout-template' ).html() );

			this.render();
		},

		render : function() {
			if ( Auth.isLoggedOut() ) {
				$( this.el ).html( this.loginTemplate() );
			} else {
				$( this.el ).html( this.logoutTemplate() );
			}
		},

		events : {
			'click #login' : 'login',
			'click #logout' : 'logout'
		},

		login : function( e ) {
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
			} catch ( er ) {
				console.log( "Could not login: " + er.message );
			}

			this.render();
		},

		logout : function( e ) {
			e.preventDefault();

			Auth.logout();
			console.log( "Successfully logged out!" );

			this.render();
		}
	} );
} );
