define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#menu-container' ),
			template: _.template( $( '#menu-template' ).html() ),

			initialize: function() {
				this.userCollection = this.options.userCollection;
				this.userCollection.on( 'reset', this.render, this );
			},

			render: function() {
				var username = '',
					user = this.userCollection.get( Auth.getUserId() );

				if ( user )
				{
					username = user.attributes.username;
				}

				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut(), username: username } ) );
			},

			events: {
				'click #menu-calculator': 'calculator',
				'click #menu-register': 'register',
				'click #menu-login': 'login',
				'click #menu-logout': 'logout'
			},

			calculator: function( e ) {
				e.preventDefault();
				Backbone.history.navigate( '', { trigger: true } );
			},

			register: function( e ) {
				e.preventDefault();
				Backbone.history.navigate( 'register', { trigger: true } );
			},

			login: function( e ) {
				e.preventDefault();
				Backbone.history.navigate( 'login', { trigger: true } );
			},

			logout: function( e ) {
				e.preventDefault();
				Backbone.history.navigate( 'logout', { trigger: true } );
			}
		} );
	}
);
