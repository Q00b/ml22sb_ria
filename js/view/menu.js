define( ['order!jQuery', 'order!underscore', 'order!backbone', 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#menu-container' ),

			initialize: function() {
				this.template = _.template( $( '#menu-template' ).html() );
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut() } ) );
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
