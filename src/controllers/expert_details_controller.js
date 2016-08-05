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
    'uiCalendarConfig',
    ExpertDetailsCtrl 
  ]);

function ExpertDetailsCtrl($scope, $state, Category, Breadcrumbs, Expert, apiConfig, Article, uiCalendarConfig) {

  $scope.baseUrl = apiConfig.baseUrl;
  $scope.articles = [];
  $scope.scheduleData = [];
  $scope.eventSources = [$scope.scheduleData];

  $scope.calendarConfig = {
    lang: 'ru',
    defaultView: 'agendaWeek',
    height: 650
  }

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
    return moment.unix(date).format(format);
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
    default:
      break;    
  } 

};