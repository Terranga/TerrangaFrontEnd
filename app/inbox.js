var app = angular.module('InboxModule', []);


app.controller('InboxController', ['$scope', '$http', function($scope, $http){
	$scope.searchUser;	
	$scope.userA;
	$scope.userB;
	
	$scope.sent;
	$scope.recieved;
	$scope.thread;
	

	
	$scope.init = function(){
		console.log('Inbox Controller: INIT');
	}
	
	$scope.searchMessages = function(){
		console.log('USER TO SEARCH: ' + $scope.searchUser)
		fetchSentMessages();
		fetchRecievedMessages();
		
	}
	
	$scope.searchThread = function(){
		console.log('USERS TO SEARCH: ' + $scope.userA +' '+ $scope.userB)
		fetchThreadMessages();
		
	}
	

	function fetchSentMessages(){
			
		//MAKE THIS SPECIFIC TO SENT?
		var url = '/api/messages?senderID='+$scope.searchUser;
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
           $scope.sent = data['messages'];
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	function fetchRecievedMessages(){
		//MAKE THIS SPECIFIC TO RECIEVED?
		var url = '/api/messages?recipientID='+$scope.searchUser;
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
           $scope.recieved = data['messages'];
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	function fetchThreadMessages(){
		
		//MAKE THIS SPECIFIC TO SENT?
		var url = '/api/messages?senderID='+$scope.userA+'&recipientID='+$scope.userB;
        $http.get(url).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            
           $scope.thread = data['messages'];
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
    
    


	
	

}]);
