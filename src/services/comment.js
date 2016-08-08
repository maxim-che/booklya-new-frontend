angular.module('booklya.services')
  .service('Comment', [
    '$http',
    'apiConfig',
    Comment
  ]);

function Comment($http, apiConfig) {

  this.getAll = function(data) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'comments/all?type=' + data.type + '&id=' + data.id
    })
  }

  this.create = function(data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiConfig.url + 'comments/create' 
    });
  };
};