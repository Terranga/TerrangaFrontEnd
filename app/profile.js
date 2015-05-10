var app = angular.module('ProfileModule', ['angularFileUpload']);


app.controller('ProfileController', ['$scope', '$http', '$upload', function($scope, $http, $upload){
	$scope.currentUser = null;
	
	$scope.init = function(){
		console.log('Profile Controller: INIT');
		fetchCurrentUser();
	}
	
	
	function fetchCurrentUser(){
		console.log('FETCH CURRENT USER: ');
		
    	var url = '/api/currentuser';
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            var c = data['currentUser'];
            var keys = ['firstName', 'lastName', 'city', 'country', 'phone', 'email'];
            for (var i=0; i<keys.length; i++){
            	var key = keys[i];
            	if (c[key] == 'none')
            		c[key] = '';
            }
            
            $scope.currentUser = c;
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.updateCurrentUser = function(){
		if ($scope.currentUser == null){
			alert('Log in first, dummy.');
			return;
		}
		
        var keys = ['firstName', 'lastName', 'city', 'country', 'phone', 'email'];
        
        var validUpdate = true;
        for (var i=0; i<keys.length; i++){
        	var key = keys[i];
        	
        	if ($scope.currentUser[key].length == 0){
        		validUpdate = false;
        		break;
        	}
        }
        
        if (validUpdate==false){
        	alert('Please complete all fields.');
        	return;
        }
        

		
		
    	var json = JSON.stringify($scope.currentUser);
		console.log('UPDATE CURRENT USER: '+json);

    	var url = '/api/profiles/'+$scope.currentUser.id;
        $http.put(url, json).success(function(data, status, headers, config) {
            console.log('CONFIRMATION: '+JSON.stringify(data));
            var confirmation = data['confirmation'];
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            alert('PROFILE UPDATED');
            
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
            
            alert('LOGGED IN SUCCESSFULLY!');
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.register = function(){
		if ($scope.profile.firstName.length==0){
			alert('Please enter your first name.');
			return;
		}

		if ($scope.profile.lastName.length==0){
			alert('Please enter your last name.');
			return;
		}
		

		if ($scope.profile.email.length==0){
			alert('Please enter your email.');
			return;
		}
		
		if ($scope.profile.email.indexOf('@') == -1){
			alert('Please enter a valid email.');
			return;
		}

		if ($scope.profile.password.length==0){
			alert('Please enter your password.');
			return;
		}

		
		console.log('REGISTER '+JSON.stringify($scope.profile));
		
    	var json = JSON.stringify($scope.profile);
    	var url = '/api/profiles';
    	
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            alert('PROFILE CREATED!');
            
            var p = data['profile'];
            $scope.featuredProfiles.push(p);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.onFileSelect = function($files, property, entity) {
		fetchUploadString($files, property, entity);
	}

	function fetchUploadString(files, property, entity){
        var url = '/api/upload?media=images';
    	
        $http.get(url).success(function(data, status, headers, config) {
            if (data['confirmation'] != 'success'){
                alert(data['message']);
            	return;
            }

        	var uploadString = data['upload'];
            console.log('UPLOAD STRING: '+uploadString);
            
            uploadFiles(files, uploadString, property, entity);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	
	//$files: an array of files selected, each file has name, size, and type.
    function uploadFiles($files, uploadString, property, entity) { 
        for (var i = 0; i < $files.length; i++) {
        	var file = $files[i];
        	$scope.upload = $upload.upload({
        		url: uploadString, //upload.php script, node.js route, or servlet url
        		method: 'POST',
        		// headers: {'header-key': 'header-value'},
        		// withCredentials: true,
        		data: {myObj: $scope.myModelObj},
        		file: file // or list of files: $files for html5 only
        		/* set the file formData name ('Content-Desposition'). Default is 'file' */
        		//fileFormDataName: myFile, //or a list of names for multiple files (html5).
            }).progress(function(evt) {
            	console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function(data, status, headers, config) { // file is uploaded successfully
        	  console.log(JSON.stringify(data));
        	  
        	  var confirmation = data['confirmation'];
        	  $scope.loading = false;
        	  if (confirmation != 'success'){
        		  $scope.loading = false;
        		  alert(data['message']);
        		  return;
        	  }
            
        	if (property=='image'){
            	var image = data['image'];
            	if (entity=='currentUser'){
                	$scope.currentUser['image'] = image['id'];
                	$scope.updateCurrentUser();
            	}
            	
//            	else if (entity=='image'){
//                	$scope.project['image'] = image['id'];
//                	updateProject();
//            	}
            	
        	}
        	
          });
        }
    }
    
    
    $scope.truncatedText = function(string, limit){
    	if (string.length < limit)
    		return string;
    	
    	return string.substring(0, limit)+'...';
    }
	



	

}]);
