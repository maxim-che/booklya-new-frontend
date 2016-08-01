angular.module('booklya.directives')
  .directive('bkWebinarPreview', [ 'apiConfig', function(apiConfig) {
    
    return {

      templateUrl: '/views/webinarpreview.html',

      scope: {
        data: '='
      },

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;

        scope.trimText = function(text, len) {
          if(text.length <= len) {
            return text;
          }

          return text.substring(0, len) + '...';
        };

        scope.formatDate = function(date, format) {
          return moment(date).format(format);
        };
        // scope.$watch('data', function() {
        //   console.log(scope.data);
        // });

      }

    };
  
  }]);