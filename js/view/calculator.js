define( ['order!jQuery', 'order!underscore', 'order!backbone', '../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#app' ),

			initialize: function() {
				this.template = _.template( $( '#calculator-template' ).html() );
				this.render();
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut() } ) );
			},

			events: {
				'click #register-link': 'register',
				'click #login-link': 'login',
				'click #logout-link': 'logout'
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
