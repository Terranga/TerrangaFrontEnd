var app = angular.module('AdminModule', []);


app.controller('AdminController', ['$scope', '$http', function($scope, $http){
	
	$scope.possibleChoices = ['profile_view_A', 'profile_view_B'];
	$scope.profileChoice = null;
	
	
	$scope.profilePages = null;
	
	
	$scope.profilePage = {'page':'profile_view_A'};


	
	$scope.init = function(){
		console.log('Admin Controller: INIT ');
	}
	

	$scope.onChanged = function() {
		console.log('THIS.ITEM: '+this.item.value);
		$scope.profileChoice = this.item.value;
		console.log('PROFILECHOICE: '+ $scope.profileChoice);
	}
	
	$scope.update = function(){
		var url = '/api/profilePage';
		 $http.get(url).success(function(data, status, headers, config) {
			 var confirmation = data['confirmation'];
	         console.log('CONFIRMATION: '+JSON.stringify(data));
	         
	         if (confirmation != 'success'){
	        	 alert(data['message']);
	        	 return;
	         }
	         
	         if (data['profilePages'] != null)
	        	 $scope.profilePages = data['profilePages'];
	         
	         $scope.profilePage = $scope.profilePages[0];
	         $scope.profilePage['page']= $scope.profileChoice;
	         
	         var url = '/api/profilePage/'+$scope.profilePage['id'];
	     	
	         var json = JSON.stringify($scope.profilePage);
	         
	         
	         $http.put(url, json).success(function(data, status, headers, config) {
	             var confirmation = data['confirmation'];
	             console.log('CONFIRMATION: '+JSON.stringify(data));

	             if (confirmation != 'success'){
	                 alert(data['message']);
	                 return;
	             }
	             
	             alert('Profile Updated');
	             
	         }).error(function(data, status, headers, config) {
	             console.log("error", data, status, headers, config);
	         });


	            
	     }).error(function(data, status, headers, config) {
	    	 console.log("error", data, status, headers, config);
	     });
		
		console.log('Send Jake: '+ $scope.profileChoice);
		
	}
	
	
	
	$scope.createProfilePage = function(){
		var json = JSON.stringify($scope.profilePage);
    	var url = '/api/profilePage';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
            alert('ProfilePage Created')
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	

}]);
