angular.module('booklya.services')
  .service('Category', [
    '$http',
    'apiConfig',
    Category
  ]);

function Category($http, apiConfig) {

  this.getAll = function() {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'categories/all'
    })
  }

  this.getWebinarsByAlias = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'webinars/category?alias=' + alias 
    });
  };

};