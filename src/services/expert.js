angular.module('booklya.services')
  .service('Expert', [
    '$http',
    'apiConfig',
    Expert
  ]);

function Expert($http, apiConfig) {

  this.getOne = function(id) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'expert/one?id=' + id
    })
  };

  this.getOneByAlias = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'categories/one?alias=' + alias 
    });
  };

};