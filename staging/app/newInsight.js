var app = angular.module('NewInsightModule', []);


app.controller('NewInsightController', ['$scope', '$http', function($scope, $http){
	$scope.insight = {'profileID':'', 'categoryTag':'', 'description':''};
	
	$scope.init = function(){
		console.log('NewInsight Controller: INIT');
	}
	
	$scope.sendInsight = function(){
		var json = JSON.stringify($scope.insight);
		console.log('GRAB MESSAGE DATA: ' + json)
		
		
    	var url = '/api/insights';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            

            alert('INSIGHT COMPOSED');
            window.location.href = '/staging/newInsight';
           
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	

}]);