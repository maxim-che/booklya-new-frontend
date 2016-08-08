angular.module('booklya.services')
  .service('Profile', [
    '$http',
    'apiConfig',
    'Helpers',
    Profile
  ]);

function Profile($http, apiConfig, Helpers) {

  this.scheduleDataMapping = function(data) {
    var result = []
    if('undefined' === typeof data) {
      return result;
    }

    _(data.days).each(function(day) {
      
      _(day.lessons).each(function(lesson) {
        result.push({
          title: 'Консультация по теме "' + lesson.properties.theme + '"',
          start: Helpers.formatDate(lesson.properties.startDate, 'YYYY-MM-DD HH:mm'),
          end: Helpers.formatDate(lesson.properties.stopDate, 'YYYY-MM-DD HH:mm'),
        });
      }); 

      _(day.webinars).each(function(webinar) {
        result.push({
          title: 'Вебинар по теме "' + webinar.properties.topic + '"',
          start: Helpers.formatDate(webinar.properties.startDate, 'YYYY-MM-DD HH:mm'),
          end: Helpers.formatDate(webinar.properties.stopDate, 'YYYY-MM-DD HH:mm'),
        });
      }); 

      _(day.orderedWebinars).each(function(webinar) {
        result.push({
          title: 'Вебинар по теме "' + webinar.properties.topic + '"',
          start: Helpers.formatDate(lesson.properties.startDate, 'YYYY-MM-DD HH:mm'),
          end: Helpers.formatDate(lesson.properties.stopDate, 'YYYY-MM-DD HH:mm'),
        });
      }); 

    });
    return result;
  };

  this.profileMenuBuild = function(baseState) {
    var baseState = Helpers.getBaseState(baseState);

    var profileMenuItems = [
      {
        id: 0,
        icon: '/img/ico-business-big.png',
        title: 'Общая информация',
        state: baseState
      },
      {
        id: 1,
        icon: '/img/button-calendar3.png',
        title: 'Расписание',
        state: baseState + '.schedule'
      },
      {
        id: 2,
        icon: '/img/button-article.png',
        title: 'Статьи',
        state: baseState + '.articles'
      },
      {
        id: 3,
        icon: '/img/ico-business-big.png',
        title: 'Отзывы',
        state: baseState + '.feedbacks'
      },
      {
        id: 4,
        icon: '/img/ico-law.png',
        title: 'Сертификаты',
        state: baseState + '.certificates'
      },
      {
        id: 5,
        icon: '/img/ico-law.png',
        title: 'Товары',
        state: baseState + '.shop'
      }
    ];

    return profileMenuItems;
  };


// ================= ROUTES ======================

  this.getOne = function(id) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'profile/one?id=' + id
    })
  };

  this.getOneByAlias = function(alias) {
    return $http({
      method: 'GET',
      url: apiConfig.url + 'categories/one?alias=' + alias 
    });
  };

};