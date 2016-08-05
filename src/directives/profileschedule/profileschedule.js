angular.module('booklya.directives')
  .directive('bkProfileSchedule', [ 'apiConfig', function(apiConfig) {
    
    return {

      templateUrl: '/views/profileschedule.html',

      scope: {
        data: '=',
        small: '='
      },

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;

      }

    };
  
  }]);