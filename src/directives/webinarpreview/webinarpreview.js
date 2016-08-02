angular.module('booklya.directives')
  .directive('bkWebinarPreview', [ 'apiConfig', function(apiConfig) {
    
    return {

      templateUrl: '/views/webinarpreview.html',

      scope: {
        data: '=',
        category: '='
      },

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;

        scope.trimText = function(text, len, dots) {
          if(text.length <= len) {
            return text;
          }

          var str = text.substring(0, len);

          if(dots) {
            str = str + '...';
          }

          return str;
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