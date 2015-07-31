var app = angular.module('AccountModule', ['angularFileUpload']);
app.controller('AccountController', ['$scope', '$http', '$upload', function($scope, $http, $upload){
	$scope.currentUser = {'loggedIn':'no'};
	$scope.ages = [];
	$scope.languages = null;
	$scope.loading = false;
	$scope.newHashtag = null;
	$scope.categories = ['art','culture','food','education','outdoors','sightseeing','sports'];
	$scope.newInsight = {'category':'', 'description':'', 'longDescription':''};
	$scope.newDream = {'title':'', 'description':'', 'longDescription':'', 'fundraisingGoal':'', 'type':'myself', 'title':'project'};
	$scope.countries = ['united states','afghanistan', 'albania', 'algeria', 'american samoa', 'andorra', 'angola', 'anguilla', 'antigua and barbuda', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan', 'bangladesh', 'barbados', 'bahamas', 'bahrain', 'belarus', 'belgium', 'belize', 'benin', 'bermuda', 'bhutan', 'bolivia', 'bosnia and herzegovina', 'boswana', 'brazil', 'british indian ocean territory', 'british virgin islands', 'brunei darussalam', 'bulgaria', 'burkina faso', 'burma', 'burundi', 'cambodia', 'cameroon', 'canada', 'cape verde', 'cayman islands', 'central african republic', 'chad', 'chile', 'china', 'christmas island', 'cocos (keeling) islands', 'colombia', 'comoros', 'congo-brazzaville', 'congo-kinshasa', 'cook islands', 'costa rica', 'croatia', 'cyprus', 'czech republic', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'east timor', 'ecuador', 'el salvador', 'egypt', 'equatorial guinea', 'eritrea', 'estonia', 'ethiopia', 'falkland islands', 'faroe islands', 'federated states of micronesia', 'fiji', 'finland', 'france', 'french guiana', 'french polynesia', 'french southern lands', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada', 'guadeloupe', 'guam', 'guatemala', 'guernsey', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'heard and mcdonald islands', 'honduras', 'hong kong', 'hungary', 'iceland', 'india', 'indonesia', 'iraq', 'ireland', 'isle of man', 'israel', 'italy', 'jamaica', 'japan', 'jersey', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'macau', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'martinique', 'mauritania', 'mauritius', 'mayotte', 'mexico', 'moldova', 'monaco', 'mongolia', 'montenegro', 'montserrat', 'morocco', 'mozambique', 'namibia', 'nauru', 'nepal', 'netherlands', 'new caledonia', 'new zealand', 'nicaragua', 'niger', 'nigeria', 'niue', 'norfolk island', 'northern mariana islands', 'norway', 'oman', 'pakistan', 'palau', 'panama', 'papua new guinea', 'paraguay', 'peru', 'philippines', 'pitcairn islands', 'poland', 'portugal', 'puerto rico', 'qatar', 'romania', 'russia', 'rwanda', 'saint helena', 'saint kitts and nevis', 'saint lucia', 'saint martin', 'saint pierre and miquelon', 'saint vincent', 'samoa', 'san marino', 'saudi arabia', 'senegal', 'serbia', 'seychelles', 'sierra leone', 'singapore', 'sint maarten', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'south georgia', 'south korea', 'spain', 'sri lanka', 'sudan', 'suriname', 'svalbard and jan mayen', 'sweden', 'swaziland', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'togo', 'tokelau', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan', 'turks and caicos islands', 'tuvalu', 'uganda', 'ukraine', 'united arab emirates', 'united kingdom', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican city', 'vietnam', 'venezuela', 'wallis and futuna', 'western sahara', 'yemen', 'zambia', 'zimbabwe'];
	$scope.messages = null;
	
	$scope.init = function(){
		console.log('Account Controller: INIT '+JSON.stringify($scope.newDream));
		fetchCurrentUser();
		for (var i=18;i<80;i++)
			$scope.ages[i-18]=i;
		
	}
	
	
	$scope.fetchMessages = function(){
		console.log("FETCH MESSAGES");
		
		var url = '/api/messages?recipient='+$scope.currentUser.id+'&mostrecent=yes';
		$http.get(url).success(function(data, status, headers, config) {
			console.log(JSON.stringify(data));
            var confirmation = data['confirmation'];
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.messages = data['messages'];

        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.addInsight = function(){
		console.log("ADD INSIGHT");
		$scope.newInsight['profile'] = $scope.currentUser.id;
		var url = '/api/insights';
		var json = JSON.stringify($scope.newInsight)
		$http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.currentUser.insights.unshift(data['insight']);
        	$scope.newInsight = {'description':'', 'longDescription':'' , 'category':''}; // clear the insight
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}

	$scope.updateInsight = function(index){
		var insightId = $scope.currentUser.insights[index].id;
		var url = '/api/insights'+insightId;
		console.log("UPDATE INSIGHT: "+ insightId);
		
		var json = JSON.stringify($scope.currentUser.insights[index].id);
		$http.put(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }

            $scope.currentUser.insights.unshift(data['insight']);
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	$scope.deleteInsight = function(index){
		
		var insightId = $scope.currentUser.insights[index].id;
		var url = '/api/insights/'+insightId;
		console.log("DELETE INSIGHT: "+ insightId);
		
		$http.delete(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.currentUser.insights.splice(index, 1);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	$scope.addDream = function(){
		
		$scope.newDream['profileID'] = $scope.currentUser.id;
		$scope.newDream['fundraisingGoal'] = $scope.newDream.fundraisingGoal.replace('$', '');
		console.log("ADD Dream: "+JSON.stringify($scope.newDream));
		
		
		var url = '/api/dreams';
		var json = JSON.stringify($scope.newDream)
		$http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.currentUser.dreams.unshift(data['dream']);
        	$scope.newDream = {'title':'', 'description':'' , 'longDescription':'', 'fundraisingGoal':''}; // clear the dream
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
		
	}
	
	$scope.deleteDream = function(index){
		
		var dreamId = $scope.currentUser.dreams[index].id;
		var url = '/api/dreams/'+dreamId;
		console.log("DELETE DREAM: "+ dreamId);
		
		$http.delete(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.currentUser.dreams.splice(index, 1);
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.addHashtag = function(){
		console.log("ADD HASHTAG");
		if ($scope.newHashtag==null){
			alert("Please enter a hashtag");
			return;
		}
		
		$scope.currentUser.hashtags.push($scope.newHashtag);
		
		$scope.loading=true;
		var json = JSON.stringify($scope.currentUser);		
    	var url = '/api/profiles/'+ $scope.currentUser.id;
    	
        $http.put(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+ JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            $scope.loading=false;
            $scope.newHashtag=null;
            alert('HASHTAG ADDED');
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	$scope.deleteHashtag = function(index){
		
		$scope.loading = true;
		$scope.currentUser.hashtags.splice(index,1);
		var url = '/api/profiles/'+ $scope.currentUser.id;
		var json = JSON.stringify($scope.currentUser);
		console.log(json);
		
		$http.put(url,json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));

            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            $scope.loading = false;
                        
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
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
            
            var keys = ['age', 'city','country','homeCity', 'homeCountry', 'languages', 'profession'];
            for(var i=0;i<keys.length;i++){
            	var key = keys[i];
            	if(c[key]=='none')
            		c[key]='';
            }
            
            $scope.currentUser = c;
            $scope.languages = getLanguages();
            $scope.fetchMessages();
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	
	$scope.updateCurrentUser = function(){
		if ($scope.currentUser==null){
			alert('Log in first, dummy');
			return;
		}
		
		if ($scope.languages!=null){
			var langs = $scope.languages.split(",");
			$scope.currentUser.languages = langs;
		}
		
        var keys = ['age', 'city','country','homeCity', 'homeCountry', 'languages', 'profession'];
        
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
	
	
	function getLanguages(){
    	var languages = $scope.currentUser.languages;
    	var langString = "";
    	for (var i = 0; i<languages.length; i++){
    		if (i!=0)
    			langString = langString.concat(","+languages[i]);
    		else
    			langString = languages[0];
    	}
    	return langString;
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
		var keys = ['age', 'city','country','homeCity', 'homeCountry', 'languages', 'profession'];
        
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
		$scope.loading=true;
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
            $scope.loading=false;
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
	
	$scope.formattedDate = function(dateStr){
		return moment(new Date(dateStr)).format('MMM D h:mm a');
	}
	
	$scope.truncatedText = function(str, limit){
		console.log('TRUNCATED TEXT');
		if (str.length < limit)
			return str;
		
		return str.substring(0, limit)+'...';
	}
	

	
}]);
