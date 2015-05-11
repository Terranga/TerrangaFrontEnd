var app = angular.module('ProfileModule', ['angularFileUpload']);
app.controller('ProfileController', ['$scope', '$http', '$upload', function($scope, $http, $upload){
	$scope.currentUser = null;
	$scope.ages = [];
	$scope.name = null;
	$scope.countries = ['afghanistan', 'albania', 'algeria', 'american samoa', 'andorra', 'angola', 'anguilla', 'antigua and barbuda', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan', 'bangladesh', 'barbados', 'bahamas', 'bahrain', 'belarus', 'belgium', 'belize', 'benin', 'bermuda', 'bhutan', 'bolivia', 'bosnia and herzegovina', 'boswana', 'brazil', 'british indian ocean territory', 'british virgin islands', 'brunei darussalam', 'bulgaria', 'burkina faso', 'burma', 'burundi', 'cambodia', 'cameroon', 'canada', 'cape verde', 'cayman islands', 'central african republic', 'chad', 'chile', 'china', 'christmas island', 'cocos (keeling) islands', 'colombia', 'comoros', 'congo-brazzaville', 'congo-kinshasa', 'cook islands', 'costa rica', 'croatia', 'cyprus', 'czech republic', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'east timor', 'ecuador', 'el salvador', 'egypt', 'equatorial guinea', 'eritrea', 'estonia', 'ethiopia', 'falkland islands', 'faroe islands', 'federated states of micronesia', 'fiji', 'finland', 'france', 'french guiana', 'french polynesia', 'french southern lands', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada', 'guadeloupe', 'guam', 'guatemala', 'guernsey', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'heard and mcdonald islands', 'honduras', 'hong kong', 'hungary', 'iceland', 'india', 'indonesia', 'iraq', 'ireland', 'isle of man', 'israel', 'italy', 'jamaica', 'japan', 'jersey', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'macau', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'martinique', 'mauritania', 'mauritius', 'mayotte', 'mexico', 'moldova', 'monaco', 'mongolia', 'montenegro', 'montserrat', 'morocco', 'mozambique', 'namibia', 'nauru', 'nepal', 'netherlands', 'new caledonia', 'new zealand', 'nicaragua', 'niger', 'nigeria', 'niue', 'norfolk island', 'northern mariana islands', 'norway', 'oman', 'pakistan', 'palau', 'panama', 'papua new guinea', 'paraguay', 'peru', 'philippines', 'pitcairn islands', 'poland', 'portugal', 'puerto rico', 'qatar', 'romania', 'russia', 'rwanda', 'saint helena', 'saint kitts and nevis', 'saint lucia', 'saint martin', 'saint pierre and miquelon', 'saint vincent', 'samoa', 'san marino', 'saudi arabia', 'senegal', 'serbia', 'seychelles', 'sierra leone', 'singapore', 'sint maarten', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'south georgia', 'south korea', 'spain', 'sri lanka', 'sudan', 'suriname', 'svalbard and jan mayen', 'sweden', 'swaziland', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'togo', 'tokelau', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan', 'turks and caicos islands', 'tuvalu', 'uganda', 'ukraine', 'united arab emirates', 'united kingdom', 'united states', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican city', 'vietnam', 'venezuela', 'wallis and futuna', 'western sahara', 'yemen', 'zambia', 'zimbabwe'];


	$scope.init = function(){
		console.log('Profile Controller: INIT ');
		fetchCurrentUser();
		for (var i=18;i<80;i++){
			$scope.ages[i-18]=i;
		}
	}
	
	
	
	function fetchCurrentUser(){
		console.log('FETCH CURRENT USER: ');
		var url = '/api/currentuser';
		$http.get(url).success(function(data, status, headers, config) {
			
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION : '+ JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            var c = data['currentUser'];
            
            var keys = ['firstName', 'lastName', 'city','country','email', 'phone'];
            for(var i=0;i<keys.length;i++){
            	var key = keys[i];
            	if(c[key]=='none')
            		c[key]='';
            }
            $scope.currentUser = c;
            $scope.name = $scope.capitalize(c['firstName'])+" "+$scope.capitalize(c['lastName']);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.updateCurrentUser = function(){
		if ($scope.currentUser==null){
			alert('Log in first, dummy');
			return;
		}
		if ($scope.name.indexOf(" ")==-1){
			alert('Please enter both your first and last name');
			return;
		}
		var parts = $scope.name.split(" ");
		$scope.currentUser['firstName']=parts.shift();
		for (var i=0;i<parts.length;i++){
			if(i==0)
				$scope.currentUser['lastName']=parts[i];
			else 
				$scope.currentUser['lastName']+=parts[i];
			if (i<parts.length)
				$scope.currentUser['lastName']+=" ";
		}

		
        var keys = ['firstName', 'lastName', 'city','country','email', 'phone', 'bio', 'dream'];
        
        var validUpdate = true;
        for(var i=0;i<keys.length;i++){
        	var key = keys[i];
        	if($scope.currentUser[key].length==0){
        		validUpdate=false;
        		break;
        	}
        }
        if (validUpdate==false){
        	alert('Please complete all fields.');
        	return;
        }
        
		var json = JSON.stringify($scope.currentUser);

		console.log('UPDATE CURRENT USER: '+ json);
		
    	var url = '/api/profiles/'+ $scope.currentUser.id;
    	
        $http.put(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+ JSON.stringify(data));
            
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
            
            alert('LOGGED IN SUCCESSFULLY!');
//            
//            var p = data['profile'];
//            $scope.featuredProfiles.push(p);
//            
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
        
        
	}
	
	
	
//	$scope.signup = function(){
//		console.log('Sign Up'+JSON.stringify($scope.profile));
//	}
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
            
            alert('PROFILE CREATED!');
            
            var p = data['profile'];
            $scope.featuredProfiles.push(p);
            
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	$scope.onFileSelect = function($files, property, entity){
		fetchUploadString($files, property, entity);
	}
	
	function fetchUploadString(files, property, entity){
		var keys = ['firstName', 'lastName', 'city','country','email', 'phone','bio'];
        
        var validUpdate = true;
        for(var i=0;i<keys.length;i++){
        	var key = keys[i];
        	if($scope.currentUser[key].length==0){
        		validUpdate=false;
        		break;
        	}
        }
        
        if (validUpdate==false){
        	alert('Please complete all fields before uploading an image.');
        	return;
        }
        
		var url = '/api/upload?media=images';
		
		$http.get(url).success(function(data, status, headers, config) {
			if (data['confirmation'] != 'success'){
                alert(data['message']);
                return;
            }
            
            var uploadString = data['upload'];
            console.log('UPLOAD STRING : '+ uploadString);
         
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
