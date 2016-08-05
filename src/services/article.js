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
    })
  }

};