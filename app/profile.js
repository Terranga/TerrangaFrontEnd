var app = angular.module('ProfileModule', []);
app.controller('ProfileController', ['$scope', '$http', '$upload', function($scope, $http, $upload){
	$scope.currentUser = {'loggedIn':'no'};
	$scope.profile = {"lastName":"", "city":"", "country":"", "firstName":""};
	$scope.newMessage = {'recipientID':'', 'senderID':'', 'subject':'', 'threadID':'', 'body':''};
	$scope.messages = null;

	$scope.init = function(){
		console.log('Profile (app) Controller: INIT ');
		
    	var requestInfo = parseLocation('site');
    	console.log(JSON.stringify(requestInfo));
    	
    	if (requestInfo.identifier==null){
        	console.log('ProfileController: MISSING PROFILE ID');
        	return;
    	}
    	
		fetchProfile(requestInfo.identifier);
	}
	
	
	$scope.formattedDate = function(dateStr){
		return moment(new Date(dateStr)).format('MMM D h:mm a');
	}
	
	$scope.sendMessage = function(){
		$scope.newMessage.recipientID = $scope.profile.id;
		$scope.newMessage.senderID = $scope.currentUser.id;
		if ($scope.newMessage.senderID==null){
			alert("Please log in to message " + $scope.profile.firstName);
			return;
		}
		var json = JSON.stringify($scope.newMessage);
		var url = '/api/messages';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            $scope.messages.push(data['message']);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	function fetchMessages(){
		if ($scope.currentUser.loggedIn=='no')
			return;
		var url = '/api/messages?senderID='+$scope.currentUser.id+'&recipientID='+$scope.profile.id;
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
           $scope.messages = data['messages'];
           
           var objDiv = document.getElementById("messages");
           objDiv.scrollTop = objDiv.scrollHeight;
           
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	function fetchProfile(profileId){
		console.log('FETCH PROFILE: '+profileId);
		var url = '/api/profiles/'+profileId;
		$http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION : '+ JSON.stringify(data));

            if (data['currentUser'] != null)
            	$scope.currentUser = data['currentUser'];

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            var p = data['profile'];
            $scope.profile = p;
    		fetchMessages();

            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	
	$scope.logout = function(){
		console.log('LOG OUT: ');
		var url = '/api/logout';
        $http.post(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+ JSON.stringify(data));
            
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
		if ($scope.currentUser.email.indexOf('@')==-1){
			alert('Please enter a valid email.');
			return;
		}
		if ($scope.currentUser.password.length==0){
			alert('Please enter your password.');
			return;
		}
		
		console.log('LOG IN'+JSON.stringify($scope.currentUser));
		
		var json = JSON.stringify($scope.currentUser);
    	var url = '/api/login';
    	
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+ JSON.stringify(data));
            
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

    
    
    function parseLocation(stem){
    	console.log('PARSE LOCATION: '+stem);
    	var resourcePath = location.href.replace(window.location.origin, ''); // strip out the domain root (e.g. http://localhost:8888)
    	var requestInfo = {"resource":null, "identifier":null, 'params':{}};

    	// parse out the parameters:
    	var p = resourcePath.split('?');
    	if (p.length > 1){
    		var paramString = p[1];
    		var a = paramString.split('&');
    		var params = {};
    		for (var i=0; i<a.length; i++){
    			var keyValue = a[i].split('=');
    			if (keyValue.length<1)
    				continue;
    			
    			params[keyValue[0]] = keyValue[1];
    		}
    		
    		requestInfo['params'] = params;
    	}
    	
    	resourcePath = p[0];

    	var parts = resourcePath.split(stem+'/');
    	if (parts.length > 1){
    		var hierarchy = parts[1].split('/');
    		for (var i=0; i<hierarchy.length; i++){
    			if (i==0)
    				requestInfo['resource'] = hierarchy[i]

    			if (i==1) 
    			    requestInfo['identifier'] = hierarchy[i];
    			
    		}
    	}

    	return requestInfo;
    }

	
}]);
