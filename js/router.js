define( ['order!jQuery', 'order!underscore', 'order!backbone', 'auth', 'collection/users', 'view/registration', 'view/login', 'view/calculator', 'view/logout', 'view/menu'],

	function( $, _, Backbone, Auth, UserCollection, RegistrationView, LoginView, CalculatorView, LogoutView, MenuView ) {
		return {
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					this.calculatorView = new CalculatorView();
					this.registrationView = new RegistrationView( { collection: new UserCollection() } );
					this.loginView = new LoginView( { collection: new UserCollection() } );
					this.logoutView = new LogoutView();
					this.menuView = new MenuView();
				},

				routes: {
					'': 'index',
					'register': 'register',
					'login': 'login',
					'logout': 'logout'
				},

				index: function() {
					this.menuView.render();
					this.calculatorView.render();
				},

				register: function() {
					this.menuView.render();
					this.registrationView.collection.fetch();
				},

				login: function() {
					this.menuView.render();
					this.loginView.collection.fetch();
				},

				logout: function() {
					this.menuView.render();
					this.logoutView.logout();
				}
			} )
		};
	}
);
