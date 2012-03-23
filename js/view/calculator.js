/**
 * @description Calculator view. Displays the nutrition calculator and handles its user interaction.
 */
define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#calculator-template' ).html() ),

			/**
			 * @function
			 * @description Initializes the view. Listen to several events for manipulating the calculator. Sets collection reset listeners to re-render the calculator.
			 * @param {Object} options Initializing options. Multiple controllers are passed here.
			 */
			initialize: function( options ) {
				_.extend( this, Backbone.Events );

				this.foodCollection = this.options.foodCollection;
				this.calculatorItemsCollection = this.options.calculatorItemsCollection;

				this.foodCollection.on( 'reset', this.render, this );
				this.calculatorItemsCollection.on( 'reset', this.render, this );

				this.on( 'AddedFood', this.foodCollection.doFetch, this.foodCollection );
				this.on( 'UsedFood', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
				this.on( 'DeletedFood', this.deletedFood, this );
				this.on( 'UpdateItem', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
				this.on( 'DeletedItem', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
			},

			deletedFood: function() {
				this.foodCollection.doFetch();
				this.calculatorItemsCollection.doFetch();
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut(), foods: this.foodCollection.models, calculatorItems: this.calculatorItemsCollection.models, totals: this.calculatorItemsCollection.totals() } ) );
			},

			events: {
				'click #create-food': 'createFood',
				'click #use-food': 'useFood',
				'click #use-food-delete': 'deleteFood',
				'change .calculator-item-update': 'updateCalculatorItem',
				'submit #calculator-items-form': 'disableSubmit',
				'click .calculator-item-remove': 'removeCalculatorItem'
			},

			disableSubmit: function( e ) {
				e.preventDefault();
			},

			/**
			 * @function
			 * @description Try to create a new food, if the food data passes validation.
			 */
			createFood: function( e ) {
				var that = this,
					foodname = '',
					protein = '',
					carbohydrates = '',
					fat = '';

				e.preventDefault();

				try {
					foodname = $( '#create-food-name' ).val();
					protein = $( '#create-food-protein' ).val();
					carbohydrates = $( '#create-food-carbohydrates' ).val();
					fat = $( '#create-food-fat' ).val();

					// Check if the food name already exists.
					if ( this.foodCollection.find( function( cmp_food ) {
						return ( cmp_food.attributes.foodname == foodname && cmp_food.attributes.user == Auth.getUserId() );
					} ) ) {
						throw new Error( 'Du har redan ett livsmedel med detta namn.' )
					}

					// Create the food model and insert it into the collection and the database.
					this.foodCollection.create( {
						 foodname: foodname,
						 protein: protein,
						 carbohydrates: carbohydrates,
						 fat: fat,
						 user: Auth.getUserId()
					}, {
						error: function( model, response ) {
							throw new Error( response );
						},

						success: function( model, response ) {
							that.trigger( 'AddedFood' );
						}
					} );
				} catch ( er ) {
					console.log( "Could not add food: " + er.message );
				}
			},

			/**
			 * @function
			 * @description Try to use a new food in the calculator.
			 */
			useFood: function( e ) {
				var that = this,
					foodId = '';

				e.preventDefault();

				try {
					foodId = $( '#use-food-id' ).val();

					// Check if the food actually exists.
					if ( !this.foodCollection.find( function( cmp_food ) {
						return ( cmp_food.attributes._id == foodId );
					} ) ) {
						throw new Error( 'Livsmedlet finns inte.' )
					}

					// Add the calculator item to the collection and database.
					this.calculatorItemsCollection.create( {
						 weight: 0,
						 food: foodId,
						 user: Auth.getUserId()
					}, {
						error: function( model, response ) {
							throw new Error( response );
						},

						success: function( model, response ) {
							that.trigger( 'UsedFood' );
						}
					} );
				} catch ( er ) {
					console.log( "Could not use food: " + er.message );
				}
			},

			/**
			 * @function
			 * @description Try to delete a food. Will also delete all calculator items having the food.
			 */
			deleteFood: function( e ) {
				var that = this,
					foodId = '',
					model = {};

				e.preventDefault();

				try {
					foodId = $( '#use-food-id' ).val();

					// Check if the food actually exists.
					if ( !this.foodCollection.find( function( cmp_food ) {
						return ( cmp_food.attributes._id == foodId );
					} ) ) {
						throw new Error( 'Livsmedlet finns inte.' )
					}

					// Destroy the model, remove it from the collection and the database. Will also remove all calculator items in the database from the backend.
					model = this.foodCollection.get( foodId );
					model.destroy( {
						error: function( model, response ) {
							throw new Error( response );
						},

						success: function( model, response ) {
							that.trigger( 'DeletedFood' );
						}
					} );
					this.foodCollection.remove( model );
					
				} catch ( er ) {
					console.log( "Could not delete food: " + er.message );
				}
			},

			/**
			 * @function
			 * @description Try to update a calculator item, if the data passes validation.
			 */
			updateCalculatorItem: function( e ) {
				var itemId = '',
					weight = '',
					model = {},
					that = this;

				e.preventDefault();

				try {
					// Extract the calculator item id.
					itemId = e.currentTarget.id.substr( 0, e.currentTarget.id.indexOf( '-weight' ) );
					weight = e.currentTarget.value;

					// Check if the calculator item actually exists.
					if ( !itemId || !this.calculatorItemsCollection.find( function( cmp_item ) {
						return ( cmp_item.attributes._id == itemId );
					} ) ) {
						throw new Error( 'Raden finns inte.' )
					}

					// Update the calculator item.
					model = this.calculatorItemsCollection.get( itemId );
					model.save( { weight: weight }, {
						error: function( model, response ) {
							throw new Error( response.msg );
						},

						success: function( model, response ) {
							that.trigger( 'UpdateItem' );
						}
					});
				} catch ( er ) {
					console.log( "Could not update calculator item: " + er.message );
				}
			},

			/**
			 * @function
			 * @description Try to remove a caclulator item.
			 */
			removeCalculatorItem: function( e ) {
				var itemId = '',
					model = {},
					that = this;

				e.preventDefault();

				try {
					// Extract the calculator item id.
					itemId = e.currentTarget.id.substr( 0, e.currentTarget.id.indexOf( '-remove' ) );

					// Check if the calculator item actually exists.
					if ( !itemId || !this.calculatorItemsCollection.find( function( cmp_item ) {
						return ( cmp_item.attributes._id == itemId );
					} ) ) {
						throw new Error( 'Raden finns inte.' )
					}

					// Remove the calculator item from the collection and the database and destroy it's model.
					model = this.calculatorItemsCollection.get( itemId );
					model.destroy( {
						error: function( model, response ) {
							throw new Error( response );
						},

						success: function( model, response ) {
							that.trigger( 'DeletedItem' );
						}
					} );
					this.calculatorItemsCollection.remove( model );
				} catch ( er ) {
					console.log( "Could not remove calculator item: " + er.message );
				}
			}
		} );
	}
);
