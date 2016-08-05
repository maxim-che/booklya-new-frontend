angular
  .module('booklya')
  .controller('ExpertDetailsCtrl', [ 
    '$scope',
    '$state',
    'Category',
    'Breadcrumbs',
    'Expert',
    'apiConfig',
    'Article',
    ExpertDetailsCtrl 
  ]);

function ExpertDetailsCtrl($scope, $state, Category, Breadcrumbs, Expert, apiConfig, Article) {

  $scope.baseUrl = apiConfig.baseUrl;
  $scope.articles = [];

  $scope.trimText = function(text, len, dots) {
    if('string' !== typeof text) {
      return '';
    }

    if(text.length <= len) {
      return text;
    }

    var str = text.substring(0, len);

    if(dots) {
      str = str + '...';
    }

    return str;
  };

  $scope.formatDate = function(date, format) {
    return moment(date).format(format);
  };

  $scope.profileMenuItems = [
    {
      id: 0,
      icon: '/img/ico-business-big.png',
      title: 'Общая информация',
      state: 'expert_details'
    },
    {
      id: 1,
      icon: '/img/button-calendar3.png',
      title: 'Расписание',
      state: 'expert_details.schedule'
    },
    {
      id: 2,
      icon: '/img/button-article.png',
      title: 'Статьи',
      state: 'expert_details.articles'
    },
    {
      id: 3,
      icon: '/img/ico-business-big.png',
      title: 'Отзывы',
      state: 'expert_details.feedbacks'
    },
    {
      id: 4,
      icon: '/img/ico-law.png',
      title: 'Сертификаты',
      state: 'expert_details.certificates'
    }
  ];

  this.getExpertInfo = function() {
    Expert.getOne($state.params.id)
      .then(function(res) {
        $scope.user = res.data;
      }, function(res) {
        console.log('ERR >>>>>>>>>>>>>>', res);
      });
  };

  this.getExpertInfo();

  switch ($state.current.name) {
    case 'expert_details':
      break;
    case 'expert_details.articles':
      Article.getProfileArticles($state.params.id)
        .then(function(res) {
          $scope.articles = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;
    default:
      break;    
  } 

};