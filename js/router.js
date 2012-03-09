define( ['order!jQuery', 'order!underscore', 'order!backbone', 'auth', 'collection/users', 'view/registration', 'view/login', 'view/calculator', 'view/logout'],

	function( $, _, Backbone, Auth, UserCollection, RegistrationView, LoginView, CalculatorView, LogoutView ) {
		return {
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					this.userCollection = new UserCollection();
				},

				routes: {
					'': 'index',
					'register': 'register',
					'login': 'login',
					'logout': 'logout'
				},

				index: function() {
					new CalculatorView();
				},

				register: function() {
					new RegistrationView( { collection: this.userCollection } );
				},

				login: function() {
					new LoginView( { collection: this.userCollection } );
				},

				logout: function() {
					new LogoutView();
				}
			} )
		};
	}
);
