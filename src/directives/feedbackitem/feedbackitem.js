angular.module('booklya.directives')
  .directive('bkFeedbackItem', ['$state', 'apiConfig', 'Helpers', function($state, apiConfig, Helpers) {
    
    return {

      templateUrl: '/views/feedbackitem.html',

      restrict:'E',

      scope: {
        feedback: '=',
      },

      link: function(scope, element, attrs) {

        scope.opened = false;

        angular.extend(scope, Helpers);

        scope.baseUrl = apiConfig.baseUrl;

        scope.toggleView = function() {
          scope.opened = !scope.opened;
          var textHeight = element.find('.feedback-content')[0];
          var textContainer = element.find('.text')[0];
          if(angular.element(textHeight).height() > angular.element(textContainer).height()) {
            if(scope.opened) {
              element.css('position', 'absolute');
              element.css('z-index', '999');
              angular.element(textContainer).css('overflow', 'auto');
              angular.element(textContainer).height(angular.element(textHeight).height() / 2);

            } else {
              element.css('position', 'static');
              element.css('z-index', '0');
              angular.element(textContainer).css('overflow', 'hidden');
              angular.element(textContainer).css('height', '100px');            
            }
          }
        }

      }

    };
  
  }]);