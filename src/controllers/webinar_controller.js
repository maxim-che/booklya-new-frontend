angular
  .module('booklya')
  .controller('WebinarCtrl', [ 
    '$scope',
    '$rootScope',
    '$state',
    'Category',
    'Breadcrumbs',
    'apiConfig',
    WebinarCtrl 
  ]);

function WebinarCtrl($scope, $rootScope, $state, Category, Breadcrumbs, apiConfig) {

  $scope.baseUrl = apiConfig.baseUrl;
  $scope.category = undefined;

  Category.getAll()
    .then(function(res) {
      $scope.categories = res.data;
      if($scope.categories.length && !_($state.params).size()) {
        $state.go('webinar.category', { alias: $scope.categories[0].alias });
      }
    }, function(res) {
      console.log('ERR >>>>>>>>>>>>>>', res);
    });

  Breadcrumbs.addItem({
    state: 'webinar',
    title: 'Вебинары',
    params: $state.params
  });

  switch ($state.current.name) {

    case 'webinar':
      break;

    case 'webinar.category':
      Category.getOneByAlias($state.params.alias)
        .then(function(res) {
          $scope.category = res.data;
          Breadcrumbs.addItem({
            state: 'webinar.category',
            title: $scope.category.title,
            params: $state.params
          });
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;

    case 'webinar':
    default:
      break;

  };

};