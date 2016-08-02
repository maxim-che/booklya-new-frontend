angular
  .module('booklya')
  .controller('WebinarDetailsCtrl', [ 
    '$scope',
    '$state',
    'Category',
    'apiConfig',
    WebinarDetailsCtrl 
  ]);

function WebinarDetailsCtrl($scope, $state, Category, apiConfig) {

  $scope.baseUrl = apiConfig.baseUrl;

};