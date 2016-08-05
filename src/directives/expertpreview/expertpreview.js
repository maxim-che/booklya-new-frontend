angular.module('booklya.directives')
  .directive('bkExpertPreview', [ 'apiConfig', function(apiConfig) {
    
    return {

      templateUrl: '/views/expertpreview.html',

      scope: {
        category: '=',
        data: '='
      },

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;

        scope.trimText = function(text, len, dots) {
          if('string' !== typeof text) {
            return '';
          }
          
          if(text.length <= len) {
            return text;
          }

          var str = text.substring(0, len);

          if(dots) {
            str = str + '...';
          }

          return str;
        };
      }

    };
  
  }]);