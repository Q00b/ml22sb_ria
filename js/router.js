/**
 * @description The Backbone router.
 */
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
			/**
			 * @description Run the router and set Backbones history to start here.
			 * @function
			 */
			run: function() {
				new this.router();
				Backbone.history.start();
			},

			router: Backbone.Router.extend( {
				/**
				 * @description Initializes the application. Instantiates necessary views. The user collection is instantiated here because it will be shared by the login- and registration-Views.
				 * @function
				 */
				initialize: function() {
					this.userCollection = new UserCollection();
					this.foodCollection = new FoodCollection();
					this.calculatorItemsCollection = new CalculatorItemsCollection();

					this.calculatorView = new CalculatorView( foodCollection: this.foodCollection, calculatorItemsCollection: this.calculatorItemsCollection );
					this.registrationView = new RegistrationView( { collection: this.userCollection  } );
					this.loginView = new LoginView( { collection: this.userCollection } );
					this.logoutView = new LogoutView();
					this.menuView = new MenuView( { userCollection: this.userCollection } );
				},

				/**
				 * @description Backbone route names and their corresponding functions.
				 */
				routes: {
					'':			'index',
					'register':	'register',
					'login':	'login',
					'logout':	'logout'
				},

				/**
				 * @description The default route. Renders the application menu and the calculator view. Also calls for doFetch() on the collections it uses to (re-)populate them.
				 * @function
				 */
				index: function() {
						this.menuView.render();
						this.calculatorView.render();
						// this.calculatorView.foodCollection.doFetch();
						// this.calculatorView.calculatorItemsCollection.doFetch();
				},

				/**
				 * @description The #register route. Renders the application menu and the registration view.
				 * @function
				 */
				register: function() {
					this.menuView.render();
					this.registrationView.render();
				},

				/**
				 * @description The #login route. Renders the application menu and the login view.
				 * @function
				 */
				login: function() {
					this.menuView.render();
					this.loginView.render();
				},

				/**
				 * @description The #logout route. Renders the application menu and calls for a logout.
				 * @function
				 */
				logout: function() {
					this.menuView.render();
					this.logoutView.logout();
				}
			} )
		};
	}
);
