(function() {
	angular
		.module('minesweeper')
		.directive('griddisplay', griddisplay);
		
		function griddisplay() {
			var directive = {
				link: link,
				templateUrl: 'app/game/grid.html',
				restrict: 'EA'
			};
			
			return directive;

			function link(scope, element, attrs) {
			  /* */
			}
		}
})();