var app = angular.module('InsightsModule', []);


app.controller('InsightsController', ['$scope', '$http', function($scope, $http){
	$scope.searchCategoryTagKey;
	$scope.searchProfileIDKey;
	
	$scope.results;

	

	
	$scope.init = function(){
		console.log('Insights Controller: INIT');
		results = null;
	}
	
	$scope.searchByCategory = function(){
		var url = '/api/insights?categoryTag='+$scope.searchCategoryTagKey;
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
           $scope.results = data['insights'];
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	$scope.searchByProfileID = function(){
		var url = '/api/insights?profileID='+$scope.searchProfileIDKey;
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
           $scope.results = data['insights'];
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	

    
    


	
	

}]);
