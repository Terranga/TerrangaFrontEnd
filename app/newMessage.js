var app = angular.module('NewMessageModule', []);


app.controller('NewMessageController', ['$scope', '$http', function($scope, $http){
	$scope.message = {'recipientID':'', 'senderID':'', 'subject':'', 'threadID':'', 'body':''};
	
	$scope.init = function(){
		console.log('NewMessage Controller: INIT');
	}
	
	$scope.sendMessage = function(){
		var json = JSON.stringify($scope.message);
		console.log('GRAB MESSAGE DATA: ' + json);
		
		
    	var url = '/api/messages';
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+confirmation);
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
            

            alert('MESSAGE SENT');
            window.location.href = '/staging/newMessage';
           

            
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
	
	

    
    


	
	

}]);
