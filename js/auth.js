define( [],
	
	function() {
		return {
			isLoggedOut: function() {
				return ( !document.cookie || document.cookie == 'user=' );
			},

			login: function( userId ) {
				document.cookie = 'user=' + userId;
			},

			logout: function() {
				document.cookie = 'user=';
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
