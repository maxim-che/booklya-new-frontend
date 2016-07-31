angular
  .module('booklya')
  .controller('MainCtrl', [ 
    '$scope',
    'Common',
    MainCtrl 
  ]);

function MainCtrl($scope, Common) {

  $scope.slides = Common.getSlides()


};