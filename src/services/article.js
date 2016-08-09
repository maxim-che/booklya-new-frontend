angular.module('booklya.services')
  .service('Article', [
    '$http',
    'apiConfig',
    Article
  ]);

function Article($http, apiConfig) {

  this.getProfileArticles = function(id) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'article/profile?id=' + id  
    });
  };

  this.getNewest = function(id) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'article/newest' 
    });
  };

  this.getFromCategory = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'article/category?alias=' + encodeURIComponent(alias)
    });
  };

  this.getByAlias = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'article/one?alias=' + encodeURIComponent(alias) 
    });
  };

  this.create = function(data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiConfig.url + 'article/create'
    });
  };

};