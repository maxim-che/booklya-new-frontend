angular.module('booklya.directives')
  .directive('bkContentSlider', function() {

    this.sortElements = function(items) {
      var result = [];
      var recomended = _(items).where({ isRecomended: true });
      var items = _(items).where({ isRecomended: false });

      if(recomended.length) {
        result.push(recomended[0]);
        recomended.splice(0, 1);
      }

      _(items).each(function(item) {
        result.push(item);
      });

      _(recomended).each(function(item) {
        result.push(item);
      });

      return result;
    };
    
    return {

      templateUrl: '/views/contentslider.html',

      scope: {
        type: '=',
        items: '=',
        category: '='
      },

      restrict:'E',

      link: function(scope, element, attrs) {
        scope.sortedItems = [];
        scope.$watch('items', function() {

          if('undefined' !== typeof scope.items) {
            scope.sortedItems = this.sortElements(scope.items);
          }

        });


      }

    };
  
  });