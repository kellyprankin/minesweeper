(function() {
	angular
    .module('minesweeper')
    .factory('gridservice', gridservice);

	gridservice.$inject = [];

	function gridservice() {
		var service = {
			getGrid: getGrid
		};
		
		return service;

		/* 9 x multiplier = grid dimensions */
		function getGrid(multiplier) {
			
			var minefield = {};
			minefield.rows = [];
			var dimension = multiplier*multiplier;
			
			generateGrid(minefield, dimension);
			layMines(minefield, dimension);
			fillHints(minefield, dimension);
			
			return minefield;
		}
		
		function generateGrid(minefield, dimension) {	
			for(var i = 0; i < dimension; i++) {
				var row = {};
				row.spots = [];
				
				for(var j = 0; j < dimension; j++) {
					var spot = {};
					spot.value = 0;
					spot.isRevealed = false;
					spot.isMine = false;
					row.spots.push(spot);
				}
				
				minefield.rows.push(row);
			}
		}
		
		function layMines(minefield, dimension) {
			
			fillMines(minefield, dimension);
			//shuffleGrid(minefield);
		}
		
		// function shuffleGrid(minefield) {
			// _.each(minefield.rows, function(row) {
				// row.spots = _.shuffle(row.spots);
			// });
			
			// minefield.rows = _.shuffle(minefield.rows);
		// }
		
		function fillMines(minefield, dimension) {
			for(var i = 0; i < dimension; i++) {
				for(var j = 0; j < dimension; j++) {
					if(j%3 === 0) {
						var current = minefield.rows[i].spots[j];
						current.isMine = true;
						current.value = -1;
					}
				}

			}
		}
		
		function fillHints(minefield, dimension) {
			for(var i = 0; i < dimension; i++) {
				for(var j = 0; j < dimension; j++) {
					var currentSpot = minefield.rows[i].spots[j];
					
					if(currentSpot.isMine) {
						incrementSurroundingValues(minefield, i, j);
					}
				}
			}
		}
		
		function incrementSurroundingValues(minefield, rowIndex, columnIndex) {
			
			var neighbors = [ { 'x' : rowIndex - 1, 'y' : columnIndex - 1 },
							  { 'x' : rowIndex - 1, 'y' : columnIndex },
							  { 'x' : rowIndex - 1, 'y' : columnIndex + 1 },
							  { 'x' : rowIndex, 'y' : columnIndex - 1 },
							  { 'x' : rowIndex, 'y' : columnIndex + 1 },
							  { 'x' : rowIndex + 1, 'y' : columnIndex - 1 },
							  { 'x' : rowIndex + 1, 'y' : columnIndex },
							  { 'x' : rowIndex + 1, 'y' : columnIndex + 1 }
							];
			
			_.each(neighbors, function(neighbor) {
				if(neighbor.x < 0 || neighbor.y < 0 || neighbor.x > minefield.rows.length - 1 || neighbor.y > minefield.rows[neighbor.x].spots.length - 1) return;
			
				var neighborSpot = minefield.rows[neighbor.x].spots[neighbor.y];
				
				if(isNotBomb(neighborSpot.value)) {
					neighborSpot.value++;
				}
			});
		}
		
		function isNotBomb(spotValue) {
			return spotValue !== -1;
		}
	}
})();