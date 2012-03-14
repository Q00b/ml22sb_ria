define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!auth',
		 'order!collection/users',
		 'order!view/registration',
		 'order!view/login',
		 'order!view/calculator',
		 'order!view/calculatoritems',
		 'order!view/food',
		 'order!view/logout',
		 'order!view/menu'],

	function( $, _, Backbone, Auth, UserCollection, RegistrationView, LoginView, CalculatorView, CalculatorItemsView, FoodView, LogoutView, MenuView ) {
		return {
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				initialize: function() {
					this.userCollection = new UserCollection();

					this.calculatorView = new CalculatorView();
					this.foodView = new FoodView();
					this.calculatorItemsView = new CalculatorItemsView();
					this.registrationView = new RegistrationView( { collection: this.userCollection } );
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
						this.foodView.render();
						this.calculatorItemsView.render();
				},

				register: function() {
					var that = this;

					this.menuView.render();
					this.userCollection.fetch();
					this.userCollection.onReset( function( collection ) {
						that.registrationView.render();
					} );
				},

				login: function() {
					var that = this;

					this.menuView.render();
					this.userCollection.fetch();
					this.userCollection.onReset( function( collection ) {
						that.loginView.render();
						console.log( that.loginView.collection );
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
