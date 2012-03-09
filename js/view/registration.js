define( ['order!jQuery', 'order!underscore', 'order!backbone'],

	function( $, _, Backbone ) {
		return Backbone.View.extend( {
			el: $( '#app' ),

			initialize: function() {
				this.collection.fetch();

				this.collection.bind( 'reset', this.render, this );
				this.collection.bind( 'add', this.render, this );

				this.template = _.template( $( '#registration-template' ).html() );
			},

			render: function() {
				$( this.el ).html( this.template( { users: this.collection.models } ) );
			},

			events: {
				'click #register': 'register'
			},

			register: function( e ) {
				e.preventDefault();

				try {
					var regName = $( '#registration-name' ).val();
					var regPw = $( '#registration-pw' ).val();
					var regPwRepeat = $( '#registration-pwrepeat' ).val();

					if ( _.find( this.collection.models, function( cmp_user ) {
						return ( cmp_user.attributes.username == regName );
					} ) ) {
						throw new Error( 'Användarnamnet är upptaget.' )
					}

					if ( !regName || !regName.match( /^[A-z0-9_]{4,20}$/i ) ) {
						throw new Error( 'Vänligen ange ett giltigt användarnamn (4-20 tecken: A-z 0-9 _).' );
					}

					if ( !regPw || !regPwRepeat || !regPw.match( /^\S{4,20}$/i ) ) {
						throw new Error( 'Vänligen ange ett giltigt lösenord (4-20 icke-whitespace tecken).' );
					} else if ( regPw !== regPwRepeat ) {
						throw new Error( 'De två angivna lösenorden matchar inte.' );
					}

					var user = this.collection.create( {
						 username: regName,
						 password: regPw 
					} );

					Backbone.history.navigate( 'Login', { trigger: true } ); 
				} catch ( er ) {
					console.log( "Could not register: " + er.message );
				}
			}
		} );
	}
);
