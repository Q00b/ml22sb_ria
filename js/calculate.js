define( [],
	
	function() {
		return {
			nutrientWeight: function( weight, nutrient ) {
				return Math.round( weight * 0.01 * nutrient );
			},

			energy: function( weight, protein, carbohydrates, fat ) {
				return Math.round( ( protein * 4.1 + carbohydrates * 4.1 + fat * 9.3 ) * weight * 0.01 );
			}
		};
	}
);
