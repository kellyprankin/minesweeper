(function() {
	angular
		.module('minesweeper')
		.directive('gamelost', gamelost);
		
		function gamelost() {
			var directive = {
				link: link,
				templateUrl: 'app/game/gamelost.html',
				restrict: 'EA'
			};
			
			return directive;
			
			function link(scope, element, attrs) {
			
			}
		}
})();