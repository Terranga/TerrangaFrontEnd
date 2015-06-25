var app = angular.module('NewReviewModule', []);


app.controller('NewReviewController', ['$scope', '$http', function($scope, $http){
	$scope.review = {'reviewed':'', 'reviewedBy':'', 'score':'', 'description':''};
	
	$scope.init = function(){
		console.log('NewReview Controller: INIT');
	}
	
	$scope.createReview = function(){
		var json = JSON.stringify($scope.review);
		console.log('GRAB MESSAGE DATA: ' + json)
		
		
    	var url = '/api/reviews';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            

            alert('Endorsement COMPOSED');
            window.location.href = '/staging/newReview';
           
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	

}]);