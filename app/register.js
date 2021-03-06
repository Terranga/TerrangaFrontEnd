var app = angular.module('RegisterModule', []);

app.controller('RegisterController', ['$scope', '$http', function($scope, $http){
	$scope.currentUser = {'loggedIn':'no'};
	$scope.traveler = {'email':'', 'password':'', 'firstName':'', 'lastName':'', 'type':'traveler'};
	$scope.local = {'email':'', 'password':'', 'firstName':'', 'lastName':'', 'type':'local'};
	$scope.profile = null;
	
	$scope.init = function(){
		console.log('Register Controller: INIT');
	}

	$scope.register = function(type){
		$scope.profile = (type=='traveler') ? $scope.traveler : $scope.local;
		
		console.log(JSON.stringify($scope.profile));

		if ($scope.profile.firstName.length==0){
			alert('Please enter your first name.');
			return;
		}
		
		if ($scope.profile.lastName.length==0){
			alert('Please enter your last name.');
			return;
		}
		
		if ($scope.profile.email.length==0){
			console.log(JSON.stringify($scope.profile));
			alert('Please enter your email.');
			return;
		}


		if ($scope.profile.email.indexOf('@')==-1){
			alert('Please enter a valid email.');
			return;
		}
		
		if ($scope.profile.password.length==0){
			alert('Please enter your password.');
			return;
		}
		
		var json = JSON.stringify($scope.profile);
		
    	var url = '/api/profiles';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            if ($scope.profile.type=='traveler'){
                window.location.href = '/site/account';
            }
            else{
                window.location.href = '/site/apply-confirmation';
            }
            
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	



	
}]);
