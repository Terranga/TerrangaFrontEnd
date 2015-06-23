var app = angular.module('NewEndorsementModule', []);


app.controller('NewEndorsementController', ['$scope', '$http', function($scope, $http){
	$scope.endorsement = {'endorsed':'', 'endorsedBy':'', 'description':''};
	
	$scope.init = function(){
		console.log('NewEndorsement Controller: INIT');
	}
	
	$scope.createEndorsement = function(){
		var json = JSON.stringify($scope.endorsement);
		console.log('GRAB MESSAGE DATA: ' + json)
		
		
    	var url = '/api/endorsements';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            

            alert('Endorsement COMPOSED');
            window.location.href = '/staging/newEndorsement';
           
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	

}]);
