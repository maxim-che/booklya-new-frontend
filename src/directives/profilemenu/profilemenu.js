angular.module('booklya.directives')
  .directive('bkProfileMenu', ['$state', 'apiConfig', function($state, apiConfig) {
    
    return {

      templateUrl: '/views/profilemenu.html',

      restrict:'E',

      scope: {
        items: '=',
      },

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;

        scope.isActive = function(item) {
          if($state.current.name === item.state) {
            return true;
          }
          return false;
        };

      }

    };
  
  }]);