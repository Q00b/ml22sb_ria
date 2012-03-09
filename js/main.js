require.config(
	{
		paths: {
			order: 'lib/order',
			jQuery: 'lib/jquery-module',
			underscore: 'lib/underscore-module',
			backbone: 'lib/backbone-module'
		}
	}
);

require( ['router'],

	function( router ) {
		router.run();
	}
);
