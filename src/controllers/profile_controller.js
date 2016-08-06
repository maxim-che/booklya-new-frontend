angular
  .module('booklya')
  .controller('ProfileCtrl', [ 
    '$scope',
    '$state',
    '$timeout',
    'Category',
    'Breadcrumbs',
    'Expert',
    'apiConfig',
    'Article',
    'Feedback',
    'uiCalendarConfig',
    'Helpers',
    'Message',
    ProfileCtrl 
  ]);

function ProfileCtrl($scope, $state, $timeout, Category, Breadcrumbs, Expert, apiConfig, Article, Feedback, uiCalendarConfig, Helpers, Message) {

  angular.extend($scope, Helpers);

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

  $scope.scheduleDataMapping = function(data) {
    var result = []

    _(data.days).each(function(day) {
      
      _(day.lessons).each(function(lesson) {
        result.push({
          title: 'Консультация по теме "' + lesson.properties.theme + '"',
          start: $scope.formatDate(lesson.properties.startDate, 'YYYY-MM-DD HH:mm'),
          end: $scope.formatDate(lesson.properties.stopDate, 'YYYY-MM-DD HH:mm'),
        });
      }); 

      _(day.webinars).each(function(webinar) {
        result.push({
          title: 'Вебинар по теме "' + webinar.properties.topic + '"',
          start: $scope.formatDate(webinar.properties.startDate, 'YYYY-MM-DD HH:mm'),
          end: $scope.formatDate(webinar.properties.stopDate, 'YYYY-MM-DD HH:mm'),
        });
      }); 

      _(day.orderedWebinars).each(function(webinar) {
        result.push({
          title: 'Вебинар по теме "' + webinar.properties.topic + '"',
          start: $scope.formatDate(lesson.properties.startDate, 'YYYY-MM-DD HH:mm'),
          end: $scope.formatDate(lesson.properties.stopDate, 'YYYY-MM-DD HH:mm'),
        });
      }); 

    });
    return result;
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

  this.getExpertInfo = function(callback) {
    Expert.getOne($state.params.id)
      .then(function(res) {
          $scope.user = res.data;
          $scope.scheduleData = $scope.scheduleDataMapping(res.data.schedule);
          if('undefined' !== typeof callback) {
            callback();
          }
      }, function(res) {
        console.log('ERR >>>>>>>>>>>>>>', res);
      });
  };

  switch ($state.current.name) {
    case 'expert_details':
    case 'expert_details.schedule':
      this.getExpertInfo(function() {
        uiCalendarConfig.calendars.schedulePreview.fullCalendar('removeEvents');
        uiCalendarConfig.calendars.schedulePreview.fullCalendar('addEventSource', $scope.scheduleData);          
      });
      break;
    case 'expert_details.feedbacks':
      this.getExpertInfo();
      Feedback.getProfileFeedbacks($state.params.id)
        .then(function(res) {
          $scope.feedbacks = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;
    case 'expert_details.articles':
      this.getExpertInfo();
      Article.getProfileArticles($state.params.id)
        .then(function(res) {
          $scope.articles = res.data;
        }, function(res) {
          console.log('ERR >>>>>>>>>>>>>>', res);
        });
      break;
    case 'expert_details.certificates':
      this.getExpertInfo();
      break;
    default:
      break;    
  } 

};