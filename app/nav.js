var app = angular.module('NavModule', []);
app.controller('NavController', ['$scope', '$http', function($scope, $http){
    $scope.nav_currentUser = {'loggedIn':'no'};
    $scope.nav_messages = null;

    $scope.fetchCurrentUser = function(){
        console.warn("FETCH USER ------ ")
        var url = '/api/currentuser';
        $http.get(url).success(function(data, status, headers, config) {
            console.log('CONFIRMATION : '+ JSON.stringify(data));
            if (data['confirmation'] != 'success')
                return;
            
            $scope.nav_currentUser = data['currentUser'];
            $scope.languages = "";
            for (var i=0; i<$scope.nav_currentUser.languages.length; i++){
            	$scope.languages += $scope.nav_currentUser.languages[i];
                if (i != $scope.nav_currentUser.languages.length-1)
                	$scope.languages += ', ';
            }
            
            $scope.fetchMessages();
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
    }

    $scope.fetchMessages = function(){
    	if ($scope.nav_currentUser.loggedIn == 'no')
    		return;
    	
        var url = '/api/messages?recipient='+$scope.nav_currentUser.id+'&mostrecent=yes';
        $http.get(url).success(function(data, status, headers, config) {
            console.log(JSON.stringify(data));
            if (data['confirmation']!= 'success'){
                alert(data['message']);
                return;
            }
            
            $scope.nav_messages = data['messages'];

        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
    }
}]);