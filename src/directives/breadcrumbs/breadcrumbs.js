angular.module('booklya.directives')
  .directive('bkBreadcrumbs', [ 'apiConfig', 'Breadcrumbs', function(apiConfig, Breadcrumbs) {
    
    return {

      templateUrl: '/views/breadcrumbs.html',

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;
        scope.breadcrumbs = Breadcrumbs.all();
        scope.lastBreadcrumb = scope.breadcrumbs[scope.breadcrumbs.length - 1];
      }

    };
  
  }]);