angular
  .module('booklya')
  .controller('IndexCtrl', [ 
    '$scope',
    'Common',
    IndexCtrl 
  ]);

function IndexCtrl($scope, Common) {

  $scope.slides = Common.getSlides()


};