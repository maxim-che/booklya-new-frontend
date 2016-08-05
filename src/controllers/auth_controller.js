angular
  .module('booklya')
  .controller('AuthCtrl', [ 
    '$scope',
    '$rootScope',
    '$state',
    'Common',
    'Auth',
    'ipCookie',
    AuthCtrl 
  ]);

function AuthCtrl($scope, $rootScope, $state, Common, Auth, ipCookie) {

  $scope.user = { };

  $scope.onSignin = function() {
    Auth.singin($scope.user)
      .then(function(res) {
        
        if('undefined' === typeof res.data.error) {
          ipCookie('sessionID', res.data);
          Auth.userInfo(ipCookie('sessionID'))
            .then(function(res) {
              $rootScope.userInfo = res.data;
            }, function(res) {
              console.log('ERR >>>>>>>>>>>>>>>>', res);
            })
          $state.go($rootScope.previousState.name, $rootScope.previousState.params);
        }

      }, function(res) {
        console.log('ERR >>>>>>>>>>>>>>>>', res);
      });
  };

};