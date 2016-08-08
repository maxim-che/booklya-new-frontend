angular
  .module('booklya')
  .controller('BlogCtrl', [
    '$state',
    '$scope',
    'Common',
    'Breadcrumbs',
    'Category',
    'Article',
    'Helpers',
    BlogCtrl 
  ]);

function BlogCtrl($state, $scope, Common, Breadcrumbs, Category, Article, Helpers) {

  angular.extend($scope, Helpers);

  $scope.categories = [];
  $scope.articles = [];
  $scope.article = {};

  Breadcrumbs.clear();
  Breadcrumbs.addItem({
    state: 'main',
    title: 'Главная',
    params: null
  });

  Category.getAll()
    .then(function(res) {
      $scope.categories = res.data;
    }, function(res) {
      console.log('ERR >>>>>>>>>>>>>>', res);
    });


  switch($state.current.name) {

    case 'blog':
      Article.getNewest()
        .then(function(res) {
          $scope.articles = res.data
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;

    case 'blog.category':
      Breadcrumbs.addItem({
        state: 'blog',
        title: 'Блоги',
        params: null
      });
      Article.getFromCategory($state.params.alias)
        .then(function(res) {
          $scope.articles = res.data
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;

    case 'blog.post':
      Article.getByAlias($state.params.postAlias)
        .then(function(res) {
          $scope.article = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;

    default:
      break;

  }

};