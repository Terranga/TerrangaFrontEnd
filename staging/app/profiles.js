var app = angular.module('ProfilesModule', []);


app.controller('ProfilesController', ['$scope', '$http', function($scope, $http){
	$scope.currentUser = {'loggedIn':'no'};
	$scope.featuredProfiles = null;
	$scope.selectedProfile = {'firstName':'', 'lastName':'', 'age':'', 'city':'', 'country':'', 'bio':''}; // insert empty values so angular doesn't freak out
	$scope.insight = {'description':'', 'category':''};

	$scope.ageArray = new Array();
	$scope.root = 'http://89.terranga-org.appspot.com';
	$scope.testing = false;
	
	$scope.init = function(){
		console.log('Profiles Controller: INIT');
		
		for (var i=0; i<50; i++){
			var age = i+10;
			$scope.ageArray.push(age.toString());
		}
		fetchFeaturedProfiles();
	}
	
	function fetchFeaturedProfiles(){
		console.log('FETCH FEATURED PROFILES: ');
		
		var path = '/api/profiles';
    	var url = ($scope.testing==true) ? $scope.root+path : path;
    	
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (data['currentUser'] != null)
            	$scope.currentUser = data['currentUser'];

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.featuredProfiles = data['profiles'];
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	$scope.viewProfile = function(index){
		$scope.selectedProfile = $scope.featuredProfiles[index];
		console.log(JSON.stringify($scope.selectedProfile));
	}

	$scope.viewInsights = function(index){
		$scope.selectedProfile = $scope.featuredProfiles[index];
		console.log(JSON.stringify($scope.selectedProfile));
	}
	
	$scope.deleteProfile = function(index){
		var profile = $scope.featuredProfiles[index];
		
		var t = confirm('Are You Sure? This Cannot Be Undone.');
		if (t==false){
			console.log('NO!');
			return;
		}
		
		console.log('YES!');
		
		var path = '/api/profiles/'+profile.id;
    	var url = ($scope.testing==true) ? $scope.root+path : path;
    	
        $http.delete(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.featuredProfiles.splice(index, 1);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}

	
	$scope.addInsight = function(){
		if ($scope.selectedProfile==null)
			return;
		
		$scope.insight['profile'] = $scope.selectedProfile.id;
		var json = JSON.stringify($scope.insight);
		console.log('ADD INSIGHT: '+json);

		var path = '/api/insights';
    	var url = ($scope.testing==true) ? $scope.root+path : path;
    	
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.selectedProfile.insights.unshift(data['insight']);
        	$scope.insight = {'description':'', 'category':''}; // clear the insight
            
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
		
	}
	
	
	$scope.updateSelectedProfile = function(){
		if ($scope.selectedProfile==null)
			return;
		
    	var json = JSON.stringify($scope.selectedProfile);
		console.log('UPDATE SELECTED PROFILE: '+json);
		
		var path = '/api/profiles/'+$scope.selectedProfile.id;
    	var url = ($scope.testing==true) ? $scope.root+path : path;
    	
        $http.put(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (data['currentUser'] != null)
            	$scope.currentUser = data['currentUser'];

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            alert('Profile Updated');
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}
	
	
	$scope.logout = function(){
		console.log('LOG OUT: ');

    	var url = '/api/logout';
        $http.post(url).success(function(data, status, headers, config) {
            console.log('CONFIRMATION: '+JSON.stringify(data));
            var confirmation = data['confirmation'];
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            window.location.href = '/';
            
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
		
    	var json = JSON.stringify($scope.currentUser);
    	var url = '/api/login';
    	
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            window.location.href = '/site/account';
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
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

    $scope.truncatedText = function(string, limit){
    	if (string.length < limit)
    		return string;
    	
    	return string.substring(0, limit)+'...';
    }
	
	

}]);
