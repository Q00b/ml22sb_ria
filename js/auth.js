define( [],
	
	function() {
		return {
			isLoggedOut: function() {
				return ( !document.cookie || document.cookie == 'userid=' );
			},

			login: function( userId ) {
				document.cookie = 'userid=' + userId;
			},

			logout: function() {
				document.cookie = 'userid=';
			},

			getUserId: function() {
				if ( this.isLoggedOut() ) {
					return null;
				}

				return document.cookie.split( "=" )[1];
			}
		};
	}
);
