var app = angular.module('HomeModule', []);


app.controller('HomeController', ['$scope', '$http', function($scope, $http){
	$scope.loading = false;
	$scope.featuredProfiles = [];
	$scope.currentUser = {'firstName':'', 'lastName':'', 'email':'', 'password':''};
	
	$scope.init = function(){
		console.log('Home Controller: INIT - '+JSON.stringify($scope.featuredProfiles));
		fetchFeaturedProfiles();
	}
	
	function fetchFeaturedProfiles(){
		console.log('FETCH FEATURED PROFILES: ');
		
    	var url = '/api/profiles?featured=yes&limit=4';
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.featuredProfiles = data['profiles'];
            
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
            
            window.location.href = '/staging/profile';
            
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
