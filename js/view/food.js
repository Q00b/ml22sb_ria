define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth'],

	function( $, _, Backbone, Auth ) {
		return Backbone.View.extend( {
			tagName: 'div',
			id: 'food-container',
			template: _.template( $( '#food-template' ).html() ),

			initialize: function( options ) {
				_.extend( this, Backbone.Events );

				this.userCollection = options.userCollection;
				this.calculatorItemsCollection = options.calculatorItemsCollection;

				this.on( 'AddedFood', this.collection.doFetch, this.collection );
				this.on( 'UsedFood', this.calculatorItemsCollection.doFetch, this.calculatorItemsCollection );
				this.on( 'DeletedFood', this.collection.doFetch, this.collection );
			},

			render: function() {
				$( this.el ).html( this.template( { foods: this.collection.models } ) );
				return this;
			},

			events: {
				'click #create-food': 'createFood',
				'click #use-food': 'useFood',
				'click #use-food-delete': 'deleteFood'
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

					if ( _.find( this.collection.models, function( cmp_food ) {
						return ( cmp_food.attributes.foodname == foodname && cmp_food.attributes.user == Auth.getUserId() );
					} ) ) {
						throw new Error( 'Du har redan ett livsmedel med detta namn.' )
					}

					this.collection.create( {
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

					if ( !_.find( this.collection.models, function( cmp_food ) {
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

					if ( !_.find( this.collection.models, function( cmp_food ) {
						return ( cmp_food.attributes._id == foodId );
					} ) ) {
						throw new Error( 'Livsmedlet finns inte.' )
					}

					model = this.collection.get( foodId );
					model.destroy( {
						error: function( model, response ) {
							throw new Error( response );
						},

						success: function( model, response ) {
							that.trigger( 'DeletedFood' );
						}
					} );
					this.collection.remove( model );
					
				} catch ( er ) {
					console.log( "Could not delete food: " + er.message );
				}
			}
		} );
	}
);
