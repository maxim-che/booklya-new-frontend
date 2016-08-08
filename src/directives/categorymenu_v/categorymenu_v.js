angular
  .module('booklya.directives')
  .directive('bkCategorymenuV', [ 'apiConfig', function(apiConfig) {
    return {

      scope: {
        items: '=',
      },
      templateUrl: '/views/categorymenu_v.html',

      link: function(scope, element, attrs) {
    
        scope.baseUrl = apiConfig.baseUrl;

      }

    }
  }]);
