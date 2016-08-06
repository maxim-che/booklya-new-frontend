angular.module('booklya.services')
  .service('Lesson', [
    '$http',
    'apiConfig',
    Lesson
  ]);

function Lesson($http, apiConfig) {

  this.create = function(data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiConfig.url + 'lessons/create'
    }); 
  };

};