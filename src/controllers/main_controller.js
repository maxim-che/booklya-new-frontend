angular
  .module('booklya')
  .controller('MainCtrl', [ 
    '$scope',
    'Common',
    MainCtrl 
  ]);

function MainCtrl($scope, Common) {

  // Simple template reloading. Need add to injection $templateCache

  // var currentPageTemplate = $state.current.templateUrl;
  // $templateCache.remove(currentPageTemplate);
  // $state.current.templateUrl = '/views/asdsadsa.html';
  // $state.reload();

};