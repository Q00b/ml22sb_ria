define( ['order!jQuery', 'order!underscore', 'order!backbone', 'auth', 'collection/users', 'view/registration', 'view/login', 'view/calculator', 'view/calculatoritems', 'view/food', 'view/logout', 'view/menu'],

	function( $, _, Backbone, Auth, UserCollection, RegistrationView, LoginView, CalculatorView, CalculatorItemsView, FoodView, LogoutView, MenuView ) {
		return {
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					var userCollection = new UserCollection();
					userCollection.fetch();

					this.calculatorView = new CalculatorView();
					this.foodView = new FoodView();
					this.calculatorItemsView = new CalculatorItemsView();
					this.registrationView = new RegistrationView( { collection: userCollection } );
					this.loginView = new LoginView( { collection: userCollection } );
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
					this.foodView.render();
					this.calculatorItemsView.render();
				},

				register: function() {
					this.menuView.render();
					this.registrationView.render();
				},

				login: function() {
					this.menuView.render();
					this.loginView.render();
				},

				logout: function() {
					this.menuView.render();
					this.logoutView.logout();
				}
			} )
		};
	}
);
