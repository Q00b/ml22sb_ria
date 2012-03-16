define( [],
	
	function() {
		return {
			isLoggedOut: function() {
				return ( !document.cookie || document.cookie == '' );
			},

			login: function( userId ) {
				document.cookie = userId;
			},

			logout: function() {
				document.cookie = '';
			},

			getUserId: function() {
				if ( this.isLoggedOut() ) {
					return null;
				}

				return document.cookie;
			}
		};
	}
);
