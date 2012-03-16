define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone',
		 'order!../auth',
		 'order!calculate'],

	function( $, _, Backbone, Auth, Calc ) {
		return Backbone.View.extend( {
			tagName: 'div',
			id: 'calculator-items-container',
			template: _.template( $( '#calculator-items-template' ).html() ),

			initialize: function( options ) {
				_.extend( this, Backbone.Events );

				this.userCollection = options.userCollection;
				this.foodCollection = options.foodCollection;

				this.on( 'UpdateItem', this.collection.doFetch, this.collection );
				this.on( 'DeletedItem', this.collection.doFetch, this.collection );
			},

			render: function() {
				$( this.el ).html( this.template( { calculatorItems: this.collection.models, calc: Calc, totals: this.totals() } ) );

				return this;
			},

			totals: function() {
				var protein = 0,
					carbohydrates = 0,
					fat = 0,
					energy = 0;

				_.each( this.collection.models, function( food ) {
					var item = food.attributes;
					var food = food.attributes.food.attributes;

					protein += Calc.nutrientWeight( item.weight, food.protein );
					carbohydrates += Calc.nutrientWeight( item.weight, food.carbohydrates );
					fat += Calc.nutrientWeight( item.weight, food.fat );
					energy += Calc.energy( item.weight, food.protein, food.carbohydrates, food.fat );
				} );

				return { protein: protein, carbohydrates: carbohydrates, fat: fat, energy: energy };
			},

			events: {
				'change .calculator-item-update': 'updateCalculatorItem',
				'click .calculator-item-remove': 'removeCalculatorItem'
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

					if ( !itemId || !_.find( this.collection.models, function( cmp_item ) {
						return ( cmp_item.attributes._id == itemId );
					} ) ) {
						throw new Error( 'Raden finns inte.' )
					}

					model = this.collection.get( itemId );
					model.save( { weight: weight }, {
						error: function( model, response ) {
							throw new Error( response.msg );
						},

						success: function( model, response ) {
							console.log("updated")
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

					if ( !itemId || !_.find( this.collection.models, function( cmp_item ) {
						return ( cmp_item.attributes._id == itemId );
					} ) ) {
						throw new Error( 'Raden finns inte.' )
					}

					model = this.collection.get( itemId );
					model.destroy( {
						error: function( model, response ) {
							throw new Error( response );
						},

						success: function( model, response ) {
							that.trigger( 'DeletedItem' );
						}
					} );
					this.collection.remove( model );
				} catch ( er ) {
					console.log( "Could not update calculator item: " + er.message );
				}
			}
		} );
	}
);
