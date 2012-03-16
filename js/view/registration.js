/**
 * @description Registration view. Displays and handles a user registration form.
 */
define( ['order!jQuery',
		 'order!underscore',
		 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			el: $( '#content-container' ),
			template: _.template( $( '#registration-template' ).html() ),

			/**
			 * @function
			 * @description This view listens to "CreatedUser"-event.
			 */
			initialize: function() {
				_.extend( this, Backbone.Events );
				this.on( 'CreatedUser', this.createdUser, this );
			},

			/**
			 * @function
			 * @description re-populates the user collection with fresh data and re-renders the registration form.
			 */
			createdUser: function() {
				this.collection.fetch();
				this.render();
			},

			render: function() {
				$( this.el ).html( this.template() );
			},

			events: {
				'click #register': 'register'
			},

			/**
			 * @function
			 * @description Try to register the user. If the registration data passes validation it will be posted to the backend for database insertment. When successful a "CreatedUser"-event will be triggered.
			 */
			register: function( e ) {
				var that = this,
					regName = '',
					regPw = '',
					regPwRepeat = '';

				e.preventDefault();

				try {
					regName = $( '#registration-name' ).val();
					regPw = $( '#registration-pw' ).val();
					regPwRepeat = $( '#registration-pwrepeat' ).val();

					// Check if the user already exists in the user collection.
					if ( _.find( this.collection.models, function( cmp_user ) {
						return ( cmp_user.attributes.username == regName );
					} ) ) {
						throw new Error( 'Användarnamnet är upptaget.' )
					}

					// Check if the username is valid.
					if ( !regName || !regName.match( /^[A-z0-9_]{4,20}$/i ) ) {
						throw new Error( 'Vänligen ange ett giltigt användarnamn (4-20 tecken: A-z 0-9 _).' );
					}

					// Check if the password is valid.
					if ( !regPw || !regPwRepeat || !regPw.match( /^\S{4,20}$/i ) ) {
						throw new Error( 'Vänligen ange ett giltigt lösenord (4-20 icke-whitespace tecken).' );
					} else if ( regPw !== regPwRepeat ) {
						throw new Error( 'De två angivna lösenorden matchar inte.' );
					}

					// Create the user and insert it's data into the collection and the database.
					this.collection.create( {
						 username: regName,
						 password: regPw
					}, {
						error: function( model, response ) {
							throw new Error( response );
						},
						success: function( model, response ) {
							console.log( 'Registrerad!.' );
							that.trigger( 'CreatedUser' );
						}
					} );

				} catch ( er ) {
					console.log( "Could not register: " + er.message );
				}
			}
		} );
	}
);
