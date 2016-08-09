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

  this.getWebinars = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'categories/webinars?alias=' + alias 
    });
  };

  this.getExperts = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'categories/experts?alias=' + alias 
    });
  };

  this.getSubjects = function(categoryId) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'categories/subjects?id=' + categoryId 
    });
  };

};