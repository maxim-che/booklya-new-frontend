angular
  .module('booklya')
  .controller('WebinarCtrl', [ 
    '$scope',
    '$state',
    'Category',
    'apiConfig',
    WebinarCtrl 
  ]);

function WebinarCtrl($scope, $state, Category, apiConfig) {

  $scope.baseUrl = apiConfig.baseUrl;
  $scope.category = undefined;

  if(_($state.params).size() && 'undefined' !== typeof $state.params.alias) {
    Category.getOneByAlias($state.params.alias)
      .then(function(res) {
        $scope.category = res.data;
      }, function(res) {
        console.log('ERR >>>>>>>>>>>>>>', res);
      });
  }

  Category.getAll()
    .then(function(res) {
      $scope.categories = res.data;
      if($scope.categories.length && !_($state.params).size()) {
        $state.go('webinar.category', { alias: $scope.categories[0].alias });
      }
    }, function(res) {
      console.log('ERR >>>>>>>>>>>>>>', res);
    });


};