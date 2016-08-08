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

  this.getIncoming = function() {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'messages/incoming'
    }); 
  };

  this.getOutgoing = function() {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'messages/outgoing'
    }); 
  };

};