var app = angular.module('ProfileModule', []);
app.controller('ProfileController', ['$scope', '$http', function($scope, $http){
	$scope.newUser = {'firstName':'', 'lastName':'', 'email':'', 'password':'', 'city':'', 'country':'', 'homeCity':'', 'homeCountry':'', 'age':'', 'phone':'', 'languages':[], 'points':'', 'profession':'', 'endorsementID':''};
	$scope.language1;
	$scope.language2;
	$scope.language3;
	
	$scope.init = function(){
		console.log('Profile Controller: INIT ');
	}
	
	$scope.createProfile = function(){
		//ADD LANGUAGES
		$scope.newUser['languages'].push($scope.language1);
		$scope.newUser['languages'].push($scope.language2);
		$scope.newUser['languages'].push($scope.language3);
		
		var json = JSON.stringify($scope.newUser);
		console.log('GRAB MESSAGE DATA: ' + json);
		
		var url = '/api/profiles';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            

            alert('PROFILE CREATED');
            window.location.href = '/staging/profile';
           

            
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}
	

	
}]);
