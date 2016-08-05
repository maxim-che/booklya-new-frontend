angular
  .module('booklya')
  .controller('ExpertCtrl', [ 
    '$scope',
    '$state',
    'Common',
    'Category',
    'Breadcrumbs',
    'apiConfig',
    ExpertCtrl 
  ]);

function ExpertCtrl($scope, $state, Common, Category, Breadcrumbs, apiConfig) {

  $scope.baseUrl = apiConfig.baseUrl;

  Category.getAll()
    .then(function(res) {
      $scope.categories = res.data;
      if($scope.categories.length && !_($state.params).size()) {
        $state.go('expert.category', { alias: $scope.categories[0].alias });
      }
    }, function(res) {
      console.log('ERR >>>>>>>>>>>>>>', res);
    });

  Breadcrumbs.addItem({
    state: 'expert',
    title: 'Эксперты',
    params: $state.params
  });

  switch ($state.current.name) {

    case 'expert':
      break;

    case 'expert.category':
      Category.getExperts($state.params.alias)
        .then(function(res) {
          $scope.category = res.data;
          Breadcrumbs.addItem({
            state: 'expert.category',
            title: $scope.category.title,
            params: $state.params
          });
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;

    case 'expert':
    default:
      break;

  };

};