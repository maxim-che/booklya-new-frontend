angular.module('booklya.services')
  .service('Webinar', [
    '$http',
    'apiConfig',
    Webinar
  ]);

function Webinar($http, apiConfig) {

  this.getOneByAlias = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'webinar/one?alias=' + encodeURIComponent(alias)
    });
  };

};