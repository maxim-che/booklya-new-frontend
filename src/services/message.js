angular.module('booklya.services')
  .service('Message', [
    '$http',
    'apiConfig',
    Message
  ]);

function Message($http, apiConfig) {

  this.create = function(data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiConfig.url + 'messages/create'
    }); 
  };

};