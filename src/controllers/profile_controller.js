angular
  .module('booklya')
  .controller('ProfileCtrl', [ 
    '$scope',
    '$state',
    '$timeout',
    'Category',
    'Breadcrumbs',
    'Profile',
    'apiConfig',
    'Article',
    'Feedback',
    'uiCalendarConfig',
    'Helpers',
    'Message',
    'ipCookie',
    '$rootScope',
    ProfileCtrl 
  ]);

function ProfileCtrl($scope, $state, $timeout, Category, Breadcrumbs, Profile, apiConfig, Article, Feedback, uiCalendarConfig, Helpers, Message, ipCookie, $rootScope) {

  angular.extend($scope, Helpers);

  $scope.baseUrl = apiConfig.baseUrl;

  $scope.access = false;

  $scope.me($state.params.id, function(result) {
    $scope.access = result;
  });

  $scope.messageBoxOpened = false;
  $scope.message = {
    text: ''
  };
  $scope.messages = [];
  $scope.messageAlert = false;

  $scope.baseUrl = apiConfig.baseUrl;
  $scope.user = {};
  $scope.articles = [];
  $scope.feedbacks = [];
  $scope.scheduleData = [];
  $scope.eventSources = [$scope.scheduleData];

  $scope.calendarConfig = {
    lang: 'ru',
    defaultView: 'agendaWeek',
    height: 650
  }

  $scope.messageBoxes = [
    {
      id: 'incoming',
      title: 'Входящие'
    },
    {
      id: 'outgoing',
      title: 'Исходящие'
    }
  ];

  $scope.profileMenuItems = Profile.profileMenuBuild($state.current.name);

  $scope.openMessageBox = function() {
    $scope.messageBoxOpened = !$scope.messageBoxOpened;
  }

  $scope.cancelMessage = function() {
    $scope.messageBoxOpened = false;
    $scope.messageAlert = false;
    $scope.message = '';
  }

  $scope.sendMessage = function() {
    if(!$scope.message.text.length) {
      $scope.messageAlert = {
        class: 'alert-danger',
        text: 'Нельзя отправлять пустое сообщение'
      };
      return;
    }
    Message.create({
      user: $scope.user.id,
      text: $scope.message.text
    }).then(function(res) {
      $scope.messageAlert = {
        class: 'alert-success',
        text: 'Ваше сообщение успешно отправлено'
      };

      $timeout(function() {
        $scope.messageAlert = false;
        $scope.messageBoxOpened = false;
        $scope.message.text = '';
      }, 3000);
    }, function(res) {
      $scope.messageAlert = {
        class: 'alert-danger',
        text: 'Произошла ошибка. Повторите позже'
      };
    })
  };

  this.getProfileInfo = function(callback) {
    Profile.getOne($state.params.id)
      .then(function(res) {
          $scope.user = res.data;
          $scope.scheduleData = Profile.scheduleDataMapping(res.data.schedule);
          if('undefined' !== typeof callback) {
            callback();
          }

          if('undefined' !== typeof res.data.messageCount && res.data.messageCount !== 0) {
            var messageMenuItem = _($scope.profileMenuItems).findWhere({ id: 6 });
            messageMenuItem.badge = 6;
          }

      }, function(res) {
        console.log('ERR >>>>>>>>>>>>>>', res);
      });
  };

  switch ($state.current.name) {
    case 'profile':
    case 'expert_details':
    case 'expert_details.schedule':
    case 'profile.schedule':
      this.getProfileInfo(function() {
        uiCalendarConfig.calendars.schedulePreview.fullCalendar('removeEvents');
        uiCalendarConfig.calendars.schedulePreview.fullCalendar('addEventSource', $scope.scheduleData);          
      });
      break;


    case 'expert_details.feedbacks':
    case 'profile.feedbacks':
      this.getProfileInfo();
      Feedback.getProfileFeedbacks($state.params.id)
        .then(function(res) {
          $scope.feedbacks = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;


    case 'expert_details.articles':
    case 'profile.articles':
      this.getProfileInfo();
      Article.getProfileArticles($state.params.id)
        .then(function(res) {
          $scope.articles = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;
    case 'profile.articles.new':
      this.getProfileInfo();
      break;

    case 'expert_details.certificates':
    case 'profile.certificates':
      this.getProfileInfo();
      break;


    case 'expert_details.shop':
    case 'profile.shop':
      this.getProfileInfo();
      break;

    case 'profile.messages':
      this.getProfileInfo();
      Message.getIncoming()
        .then(function(res) {
          $scope.messages = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      
    default:
      break;    
  } 

};