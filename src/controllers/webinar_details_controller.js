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

  $scope.baseUrl = apiConfig.baseUrl;

  Breadcrumbs.addItem({
    state: 'webinar',
    title: 'Вебинары',
    params: null
  });

  $scope.sidebarMenuItems = [];

  Webinar.getOneByAlias($state.params.alias)
    .then(function(res) {
      
      $scope.webinar = res.data;
      
      Breadcrumbs.addItem({
        state: 'webinar.category',
        title: $scope.webinar.category.title,
        params: { alias: $scope.webinar.category.alias }
      });

      $scope.sidebarMenuItems.push({
        id: 0,
        title: 'О вебинаре',
        icon: '/img/button-article.png',
        content: $scope.webinar.fullDescription
      });

      $scope.sidebarMenuItems.push({
        id: 2,
        title: 'Программа вебинара',
        icon: '/img/button-article.png',
        content: '<h1>Программа</h1>'
      });

      $scope.sidebarMenuItems.push({
        id: 3,
        title: 'Авторы',
        icon: '/img/button-article.png',
        content: '<h1>Авторы</h1>'
      });

      $scope.sidebarMenuItems.push({
        id: 4,
        title: 'Отзывы',
        icon: '/img/button-article.png',
        content: '<h1>Отзывы</h1>'
      });

      $scope.sidebarMenuItems.push({
        id: 5,
        title: 'Часто задаваемые вопросы',
        icon: '/img/button-article.png',
        content: '<h1>Часто задаваемые вопросы</h1>'
      });

      $scope.sidebarMenuItemCurrent = $scope.sidebarMenuItems[0];

    }, function(res) {
      console.log('ERR >>>>>>>>>>', res);
    });

};