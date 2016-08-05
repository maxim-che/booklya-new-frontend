angular.module('booklya.services')
  .service('Auth', [
    '$http',
    'apiConfig',
    Auth
  ]);

function Auth($http, apiConfig) {

  this.singin = function(data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiConfig.url + 'auth/signin'
    });
  };

  this.userInfo = function(sessionID) {
    return $http({
      method: 'GET',
      url:apiConfig.url + 'auth/userInfo?sessionID=' + sessionID
    });
  };

};