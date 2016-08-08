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
    ProfileCtrl 
  ]);

function ProfileCtrl($scope, $state, $timeout, Category, Breadcrumbs, Profile, apiConfig, Article, Feedback, uiCalendarConfig, Helpers, Message) {

  angular.extend($scope, Helpers);

  $scope.baseUrl = apiConfig.baseUrl;

  $scope.messageBoxOpened = false;
  $scope.message = {
    text: ''
  };
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
        $scope.message = '';
      }, 3000);
    }, function(res) {
      $scope.messageAlert = {
        class: 'alert-danger',
        text: 'Произошла ошибка. Повторите позже'
      };
    })
  };

  $scope.profileMenuItems = Profile.profileMenuBuild($state.current.name);

  this.getProfileInfo = function(callback) {
    Profile.getOne($state.params.id)
      .then(function(res) {
          $scope.user = res.data;
          $scope.scheduleData = Profile.scheduleDataMapping(res.data.schedule);
          if('undefined' !== typeof callback) {
            callback();
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


    case 'expert_details.certificates':
    case 'profile.certificates':
      this.getProfileInfo();
      break;


    case 'expert_details.shop':
    case 'profile.shop':
      this.getProfileInfo();
      break;

      
    default:
      break;    
  } 

};