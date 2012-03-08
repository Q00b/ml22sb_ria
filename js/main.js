require(
	{
		paths: {
			order: 'lib/order'
		}
	},

	['nutritioncalc'],

	function( nutritionCalc ) {
		nutritionCalc.run();
	}
);
