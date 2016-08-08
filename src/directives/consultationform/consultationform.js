angular.module('booklya.directives')
  .directive('bkConsultationForm', [ '$rootScope', '$timeout', 'apiConfig', 'ipCookie', 'Lesson', function($rootScope, $timeout, apiConfig, ipCookie, Lesson) {
    
    return {

      templateUrl: '/views/consultationform.html',

      scope: {
        user: '=user',
      },

      restrict:'E',

      link: function(scope, element, attrs) {
        
        scope.access = false;
        scope.formCollapsed = true;
        scope.alert = false;
        scope.currentPrice = 0;

        scope.form = {
          user: scope.user.id,
          date: new Date(),
          subject: undefined,
          topic: '',
          price: 0
        }

        scope.datePicker = {
          opened: false,
          dateOpened: false,
          hourStep: 1,
          format: 'dd-MMM-yyyy',
          minuteStep: 15,
          showMeridian: false,
          dateOptions: {
            showWeeks: false,
            startingDay: 0            
          }
        }

        scope.openDatepicker = function() {
          scope.datePicker.opened = !scope.datePicker.opened;
        }
  

        scope.openForm = function() {
          scope.formCollapsed = false;
        };

        scope.onCancel = function() {
          scope.formCollapsed = true;
          scope.alert = false;
        };

        scope.onSubmit = function() {
          Lesson.create({
            startDate: moment(scope.form.date).unix(),
            stopDate: moment(scope.form.date).add(1, 'hours').unix(),
            theme: scope.form.topic,
            subject: scope.form.subject,
            price: scope.form.price,
            user: scope.form.user
          }).then(function(res) {
            scope.alert = {
              class: 'alert-success',
              text: 'Консультация успешно добавлена'
            };
            $timeout(function() {
              scope.alert = false;
              scope.formCollapsed = true;
            }, 3000);
          }, function(res) {
            scope.alert = {
              class: 'alert-danger',
              text: 'При добавлении консультации произошла ошибка. Пожалуйста, повторите позже.'
            };
          })
        };

        var checkAccess = function() {
          if('undefined' !== typeof $rootScope.userInfo && 'undefined' !== typeof ipCookie('sessionID')) {
            if(scope.to !== $rootScope.userInfo.id) {
              scope.access = true;
            } else {
              scope.access = false;
            }
          } else {
            scope.access = false;
          }
        };

        scope.changeSubject = function() {
          if('undefined' !== typeof scope.form.subject) {
            var price = _(scope.user.subjects).findWhere({ id: scope.form.subject }).price;
            scope.form.price = price;
          }          
        };

        scope.$watch('user', function() {
          if('undefined' !== typeof scope.user.subjects && scope.user.subjects.length) {
            scope.form.user = scope.user.id;
            scope.form.subject = scope.user.subjects[0].id;
            scope.changeSubject();
          }
          checkAccess();
        });

        $rootScope.$watch('userInfo', function() {
          checkAccess();
        });

      }
    
    }

  }]);