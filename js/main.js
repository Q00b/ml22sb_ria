/**
 * @description The application entrance. Sets Require.js configuration and runs the backbone router.
 */
require(
	/**
	 * @description Configuration.
	 */
	{
		paths: {
			order: 'lib/order',
			jQuery: 'lib/jquery-module',
			underscore: 'lib/underscore-module',
			backbone: 'lib/backbone-module',
			relational: 'lib/backbone-relational'
		}
	},

	['router'],
	
	function( router ) {
		router.run();
	}
);
