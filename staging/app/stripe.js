var app = angular.module('StripeModule', []);


app.controller('StripeController', ['$scope', '$http', function($scope, $http){
	$scope.loading = false;
	$scope.featuredProfiles = [];
	$scope.currentUser = {'loggedIn':'no'};
	
	$scope.init = function(){
		console.log('Stripe Controller: INIT - '+JSON.stringify($scope.featuredProfiles));
		checkCurrentUser();
	}
	
	function checkCurrentUser(){
    	var url = '/api/currentuser';
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
        		$scope.loading = false;
                alert(data['message']);
                return;
            }
            
        	$scope.currentUser = data['currentUser'];
        	$scope.currentUser['loggedIn'] = 'yes';
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}
	
	$scope.login = function(){
		if ($scope.currentUser.email.length==0){
			alert('Please enter your email.');
			return;
		}
		
		if ($scope.currentUser.email.indexOf('@') == -1){
			alert('Please enter a valid email.');
			return;
		}

		if ($scope.currentUser.password.length==0){
			alert('Please enter your password.');
			return;
		}

		console.log('LOG IN '+JSON.stringify($scope.currentUser));
		
		$scope.loading = true;
    	var json = JSON.stringify($scope.currentUser);
    	var url = '/api/login';
    	
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
        		$scope.loading = false;
                alert(data['message']);
                return;
            }
            
        	$scope.currentUser = data['profile'];
        	$scope.currentUser['loggedIn'] = 'yes';
            
//            window.location.href = '/site/account';
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}
	
    $scope.truncatedText = function(string, limit){
    	if (string.length < limit)
    		return string;
    	
    	return string.substring(0, limit)+'...';
    }
	
	
	
    $scope.capitalize = function(string) {
    	var parts = string.split(' ');
    	var capitalizedString = '';
    	
    	for (var i=0; i<parts.length; i++){
    		var s = parts[i];
    		if (s.length <= 1){
    			capitalizedString = capitalizedString+' '+s.toUpperCase();
    			continue;
    		}
    		
    		s = s.charAt(0).toUpperCase() + s.slice(1);
			capitalizedString = capitalizedString+' '+s;
    	}
    	
		capitalizedString = capitalizedString.trim();
		return capitalizedString;
    }
    
    


	
	

}]);
