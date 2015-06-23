var app = angular.module('AdminModule', []);


app.controller('AdminController', ['$scope', '$http', function($scope, $http){
	
	$scope.possibleChoices = ['Profile View A', 'Profile View B'];
	$scope.profileChoice = null;


	
	$scope.init = function(){
		console.log('Admin Controller: INIT ');
	}
	

	$scope.onChanged = function() {
		console.log('THIS.ITEM: '+this.item.value);
		$scope.profileChoice = this.item.value;
		console.log('PROFILECHOICE: '+ $scope.profileChoice);
	}
	
	$scope.update = function(){
		console.log('Send Jake: '+ $scope.profileChoice);
		alert('New Profile View: '+ $scope.profileChoice);
	}
	

}]);
