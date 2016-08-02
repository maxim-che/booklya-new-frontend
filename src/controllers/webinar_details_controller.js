angular
  .module('booklya')
  .controller('WebinarDetailsCtrl', [ 
    '$scope',
    '$state',
    'Category',
    'Breadcrumbs',
    'Webinar',
    'apiConfig',
    WebinarDetailsCtrl 
  ]);

function WebinarDetailsCtrl($scope, $state, Category, Breadcrumbs, Webinar, apiConfig) {

  Breadcrumbs.addItem({
    state: 'webinar',
    title: 'Вебинары',
    params: null
  });

  Webinar.getOneByAlias($state.params.alias)
    .then(function(res) {
      $scope.webinar = res.data;
      Breadcrumbs.addItem({
        state: 'webinar.category',
        title: $scope.webinar.category.title,
        params: { alias: $scope.webinar.category.alias }
      });
    }, function(res) {
      console.log('ERR >>>>>>>>>>', res);
    });

};