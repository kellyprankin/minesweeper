(function() {
	angular
		.module('minesweeper')
		.controller('Game', Game);
		
		Game.$inject = ['gridservice'];
		
		function Game(gridservice) {
			var vm = this;
			initializeGame();
			
			vm.revealSpot = revealSpot;
			vm.resetApp = resetApp;

			function revealSpot(spot) {
				spot.isRevealed = true;
				
				if(spot.value === -1) setGameLost(true);
			}
			
			function resetApp() {
				vm.grid = getNewGrid(3);
				setGameLost(false);
			}
			
			function initializeGame() {
				setGameLost(false);
				vm.grid = getNewGrid(3);
			}
			
			function setGameLost(value) {
				vm.isLostGame = value;
			}
			
			function getNewGrid(dimension) {
				return gridservice.getGrid(dimension);
			}
			
			return vm;
		}
})();