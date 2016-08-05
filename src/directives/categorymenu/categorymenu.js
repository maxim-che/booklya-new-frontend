angular
  .module('booklya.directives')
  .directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
  })
  .directive('bkCategorymenu', function() {
    return {

      scope: {
        items: '=',
        baseUrl: '='
      },
      templateUrl: '/views/categorymenu.html',

      link: function(scope, element, attrs) {
        scope.addItems = [];
        // scope.$watch('items', function() {
        //   var items = document.querySelector('.inline-items li');
        //   console.log(scope.items);
        // });
        scope.$on('ngRepeatFinished', function(e) {
          var totalWidth = 0;
          var list = document.querySelector('ul.inline-items');
          var items = angular.element(list).children();
          var paddings = 15;
          var offset = 10;
          var countOfOffsetElements = 0;
          var startOffsetElement = undefined;

          _(items).each(function(item, idx) {
            var itemWidth = item.clientWidth  + (paddings * 2) + offset;

            totalWidth += itemWidth;

            if(totalWidth >= window.innerWidth) {
              if('undefined' === typeof startOffsetElement) {
                startOffsetElement = idx - 1;
              }
              scope.addItems.push(scope.items[idx]);
              countOfOffsetElements ++;
            }


          });

          scope.items.splice(startOffsetElement, countOfOffsetElements + 1);

          if (scope.addItems.length) {
            var addList = document.querySelector('ul.add-items');
            angular.element(addList).removeClass('hidden');
          }

        });


      }

    }
  });
