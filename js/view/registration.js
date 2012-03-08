define( ['order!jQuery', 'order!underscore', 'order!backbone'], function( $, _, Backbone ) {
	return Backbone.View.extend( {
		el: $( '#registration' ),

		initialize : function() {
			this.template = _.template( $( '#registration-template' ).html() );
		},

		render : function() {
			$( this.el ).html( this.template );
		},

		events : {
			'click #register' : 'register'
		},

		register : function( e ) {
			e.preventDefault();

			try {

			} catch ( er ) {
				console.log( "Could not register: " + er.message );
			}
		}
	} );
} );
