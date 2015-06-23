var app = angular.module('NewDreamModule', []);


app.controller('NewDreamController', ['$scope', '$http', function($scope, $http){
	$scope.dream = {'profileID':'', 'title':'', 'description':''};
	
	$scope.init = function(){
		console.log('NewDreamController: INIT');
	}
	
	$scope.sendDream = function(){
		var json = JSON.stringify($scope.dream);
		console.log('GRAB MESSAGE DATA: ' + json);
		
		
    	var url = '/api/dreams';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            

            alert('DREAM COMPOSED');
            window.location.href = '/staging/newDream';
           
       
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	

}]);
