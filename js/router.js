define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!auth',
		 'order!collection/users',
		 'order!view/registration',
		 'order!view/login',
		 'order!view/calculator',
		 'order!view/logout',
		 'order!view/menu'],

	function( $, _, Backbone, Auth, UserCollection, RegistrationView, LoginView, CalculatorView, LogoutView, MenuView ) {
		return {
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					this.userCollection = new UserCollection();

					this.calculatorView = new CalculatorView( { userCollection: this.userCollection } );
					this.registrationView = new RegistrationView( { collection: this.userCollection  } );
					this.loginView = new LoginView( { collection: this.userCollection } );
					this.logoutView = new LogoutView();
					this.menuView = new MenuView();
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
				},

				register: function() {
					var that = this;

					this.menuView.render();

					this.userCollection.onReset( function( collection ) {
						that.registrationView.render();
					} );
				},

				login: function() {
					var that = this;

					this.menuView.render();

					this.userCollection.onReset( function( collection ) {
						that.loginView.render();
					} );
				},

				logout: function() {
					this.menuView.render();
					this.logoutView.logout();
				}
			} )
		};
	}
);
