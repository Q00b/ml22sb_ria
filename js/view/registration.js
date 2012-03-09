define( ['order!jQuery', 'order!underscore', 'order!backbone', '../collection/users'], function( $, _, Backbone, UserCollection ) {
	return Backbone.View.extend( {
		el: $( '#registration' ),

		initialize : function() {
			this.template = _.template( $( '#registration-template' ).html() );
			this.collection = new UserCollection();
			this.collection.bind( "add", this.render, this );
		},

		render : function() {
			$( this.el ).html( this.template( { users : this.collection.models } ) );
		},

		events : {
			'click #register' : 'register'
		},

		register : function( e ) {
			e.preventDefault();

			try {
				var regName = $( '#registration-name' ).val();
				var regPw = $( '#registration-pw' ).val();
				var regPwRepeat = $( '#registration-pwrepeat' ).val();

				if ( !regName || !regName.match( /^[A-z0-9_]{4,20}$/i ) ) {
					throw new Error( 'You must specify a valid username (4-20 characters: A-z 0-9 _).' );
				}

				if ( !regPw || !regPwRepeat || !regPw.match( /^\S{4,20}$/i ) ) {
					throw new Error( 'You must specify a valid password (4-20 non-whitespace characters).' );
				} else if ( regPw !== regPwRepeat ) {
					throw new Error( 'The password did not match the repeat.' );
				}

				this.collection.create( {
					username : regName,
					password : regPw
				} );

				console.log( "Successfully registered!" );
			} catch ( er ) {
				console.log( "Could not register: " + er.message );
			}
		}
	} );
} );
