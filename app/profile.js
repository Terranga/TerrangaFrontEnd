var app = angular.module('ProfileModule', ['angularFileUpload']);
app.controller('ProfileController', ['$scope', '$http', '$upload', function($scope, $http, $upload){
	$scope.currentUser = null;
	$scope.ages = [];
	$scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

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
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.updateCurrentUser = function(){
		if ($scope.currentUser==null){
			alert('Log in first, dummy');
			return;
		}
        var keys = ['firstName', 'lastName', 'city','country','email', 'phone', 'bio'];
        
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
	
	
	
	
	
}]);
