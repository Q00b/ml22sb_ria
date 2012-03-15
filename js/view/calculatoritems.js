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
				this.userCollection = options.userCollection;
				this.foodCollection = options.foodCollection;

				this.collection.on( 'reset', this.render, this );
				this.collection.on( 'add', this.collection.fetch, this.collection );
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
				'click #calculator-update' : 'updateCalculatorItems'
			},

			updateCalculatorItems: function( e ) {
				e.preventDefault();
				console.log( "Update Items True" );
			}
		} );
	}
);
