define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!collection/users',
		 'order!view/registration',
		 'order!view/login',
		 'order!view/calculator',
		 'order!view/logout',
		 'order!view/menu'],

	function( $, _, Backbone, UserCollection, RegistrationView, LoginView, CalculatorView, LogoutView, MenuView ) {
		return {
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					this.userCollection = new UserCollection();

					this.calculatorView = new CalculatorView();
					this.registrationView = new RegistrationView( { collection: this.userCollection  } );
					this.loginView = new LoginView( { collection: this.userCollection } );
					this.logoutView = new LogoutView();
					this.menuView = new MenuView( { userCollection: this.userCollection } );
				},

				routes: {
					'':			'index',
					'register':	'register',
					'login':	'login',
					'logout':	'logout'
				},

				index: function() {
						this.menuView.render();
						this.calculatorView.render();
						this.calculatorView.foodCollection.doFetch();
						this.calculatorView.calculatorItemsCollection.doFetch();
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
