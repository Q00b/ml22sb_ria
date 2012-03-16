define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth',
		 'order!../collection/food',
		 'order!../collection/calculatoritems',
		 'order!calculate'],

	function( $, _, Backbone, Auth, FoodCollection, CalculatorItemsCollection, Calc ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#calculator-template' ).html() ),

			initialize: function( options ) {
				_.extend( this, Backbone.Events );

				this.foodCollection = new FoodCollection();
				this.calculatorItemsCollection = new CalculatorItemsCollection();

				this.foodCollection.on( 'reset', this.render, this );
				this.calculatorItemsCollection.on( 'reset', this.render, this );

				this.on( 'AddedFood', this.foodCollection.doFetch, this.foodCollection );
				this.on( 'UsedFood', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
				this.on( 'DeletedFood', this.deletedFood, this );
				this.on( 'UpdateItem', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
				this.on( 'DeletedItem', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
			},

			deletedFood: function() {
				this.calculatorItemsCollection.doFetch();
				this.foodCollection.doFetch();
			},

			render: function() {
				$( this.el ).html( this.template( { loggedOut: Auth.isLoggedOut(), foods: this.foodCollection.models, calculatorItems: this.calculatorItemsCollection.models, totals: this.totals(), calc: Calc } ) );
			},

			totals: function() {
				var that = this,
					protein = 0,
					carbohydrates = 0,
					fat = 0,
					energy = 0
					item = {},
					food = {};

				_.each( this.calculatorItemsCollection.models, function( item ) {
					item = item.attributes;
					food = that.foodCollection.get( item.food );
					console.log( food );

					protein += Calc.nutrientWeight( item.weight, food.protein );
					carbohydrates += Calc.nutrientWeight( item.weight, food.carbohydrates );
					fat += Calc.nutrientWeight( item.weight, food.fat );
					energy += Calc.energy( item.weight, food.protein, food.carbohydrates, food.fat );
				} );

				return { protein: protein, carbohydrates: carbohydrates, fat: fat, energy: energy };
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

					if ( !foodname || !foodname.match( /^\S+(.+\S+)?$/i ) ) {
						throw new Error( 'Vänligen ange ett livsmedelsnamn. (Kan ej börja eller sluta med white-space-tecken.)' );
					}

					if ( !protein.match( /^[0-9]+$/i ) || !carbohydrates.match( /^[0-9]+$/i ) || !fat.match( /^[0-9]+$/i ) ) {
						throw new Error( 'Vänligen ange siffror för mängd makronutrienter.' );
					}

					if ( _.find( this.foodCollection.models, function( cmp_food ) {
						return ( cmp_food.attributes.foodname == foodname && cmp_food.attributes.user == Auth.getUserId() );
					} ) ) {
						throw new Error( 'Du har redan ett livsmedel med detta namn.' )
					}

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

			useFood: function( e ) {
				var that = this,
					foodId = '';

				e.preventDefault();

				try {
					foodId = $( '#use-food-id' ).val();

					if ( !_.find( this.foodCollection.models, function( cmp_food ) {
						return ( cmp_food.attributes._id == foodId );
					} ) ) {
						throw new Error( 'Livsmedlet finns inte.' )
					}

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

			deleteFood: function( e ) {
				var that = this,
					foodId = '',
					model = {};

				e.preventDefault();

				try {
					foodId = $( '#use-food-id' ).val();

					if ( !_.find( this.foodCollection.models, function( cmp_food ) {
						return ( cmp_food.attributes._id == foodId );
					} ) ) {
						throw new Error( 'Livsmedlet finns inte.' )
					}

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

			updateCalculatorItem: function( e ) {
				var itemId = '',
					weight = '',
					model = {},
					that = this;

				e.preventDefault();

				try {
					itemId = e.currentTarget.id.substr( 0, e.currentTarget.id.indexOf( '-weight' ) );
					weight = e.currentTarget.value;

					if ( !weight || !weight.match( /^[0-9]+$/i ) ) {
						throw new Error( 'Du måste ange vikt i gram som heltal.' );
					}

					if ( !itemId || !_.find( this.calculatorItemsCollection.models, function( cmp_item ) {
						return ( cmp_item.attributes._id == itemId );
					} ) ) {
						throw new Error( 'Raden finns inte.' )
					}

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

			removeCalculatorItem: function( e ) {
				var itemId = '',
					model = {},
					that = this;

				e.preventDefault();

				try {
					itemId = e.currentTarget.id.substr( 0, e.currentTarget.id.indexOf( '-remove' ) );

					if ( !itemId || !_.find( this.calculatorItemsCollection.models, function( cmp_item ) {
						return ( cmp_item.attributes._id == itemId );
					} ) ) {
						throw new Error( 'Raden finns inte.' )
					}

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
					console.log( "Could not update calculator item: " + er.message );
				}
			}
		} );
	}
);
