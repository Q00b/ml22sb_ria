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
				this.userCollection = options.userCollection;
				this.collection.on( 'reset', this.render, this );
				this.collection.on( 'add', this.render, this );
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
				var name = '',
					protein = '',
					carbohydrates = '',
					fat = '';

				e.preventDefault();

				// ADD FOOD
				try {
					name = $( '#create-food-name' ).val();
					protein = $( '#create-food-protein' ).val();
					carbohydrates = $( '#create-food-carbohydrates' ).val();
					fat = $( '#create-food-fat' ).val();

					if ( !name || !name.match( /^\S+(.+\S+)?$/i ) ) {
						throw new Error( 'Vänligen ange ett livsmedelsnamn. (Kan ej börja eller sluta med white-space-tecken.)' );
					}

					if ( !protein.match( /^[0-9]+$/i ) || !carbohydrates.match( /^[0-9]+$/i ) || !fat.match( /^[0-9]+$/i ) ) {
						throw new Error( 'Vänligen ange siffror för mängd makronutrienter.' );
					}

					if ( _.find( this.collection.models, function( cmp_food ) {
						return ( cmp_food.attributes.name == name && cmp_food.attributes.user == Auth.getUserId() );
					} ) ) {
						throw new Error( 'Du har redan ett livsmedel med detta namn.' )
					}

					this.collection.create( {
						 name: name,
						 protein: protein,
						 carbohydrates: carbohydrates,
						 fat: fat,
						 user: Auth.getUserId()
					}, {
						error: function( model, response ) {
							throw new Error( response );
						}
					} );

					// Backbone.history.navigate( 'login', { trigger: true } ); 
				} catch ( er ) {
					console.log( "Could not add food: " + er.message );
				}
			},

			useFood: function( e ) {
				e.preventDefault();
				console.log( "use food" );
			},

			deleteFood: function( e ) {
				e.preventDefault();
				console.log( "delete food" );
			}
		} );
	}
);
