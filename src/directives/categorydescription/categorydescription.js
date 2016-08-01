angular.module('booklya.directives')
  .directive('bkCategoryDescription', function() {
    
    return {
      scope: {
        text: '='
      },
      templateUrl: '/views/categorydescription.html',
      restrict:'E',
      link: function(scope, element, attrs) {
        var originalHeight = 0;
        scope.isOverflow = false;
        scope.buttonText = 'подробнее';

        scope.$watch('text', function() {
          
          var descriptionBlock = document.querySelector('.category-description');
          var fullText = document.querySelector('.category-text');

          originalHeight = descriptionBlock.clientHeight;

          if(descriptionBlock.clientHeight < fullText.clientHeight) {
            scope.isOverflow = true;
          }

        });

        scope.moreClick = function() {
          var descriptionBlock = document.querySelector('.category-description');
          var fullText = document.querySelector('.category-text');

          if(originalHeight !== descriptionBlock.clientHeight) {
            angular.element(descriptionBlock).css('max-height', originalHeight + 'px');
            scope.buttonText = 'подробнее';
          } else {
            angular.element(descriptionBlock).css('max-height', fullText.clientHeight + 'px');
            scope.buttonText = 'свернуть';
          }
        }

      }
    };
  
  });