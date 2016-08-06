angular.module('booklya.services')
  .service('Feedback', [
    '$http',
    'apiConfig',
    Feedback
  ]);

function Feedback($http, apiConfig) {

  this.getProfileFeedbacks = function(id) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'feedbacks/profile?id=' + id  
    })
  };

  this.create = function(data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiConfig.url + 'feedbacks/create'
    }); 
  };

};