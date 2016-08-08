angular.module('booklya.directives')
  .directive('bkFeedbackForm', [ '$rootScope', '$timeout', 'apiConfig', 'Feedback', 'ipCookie', 'localStorageService', function($rootScope, $timeout, apiConfig, Feedback, ipCookie, localStorageService) {
    
    return {

      templateUrl: '/views/feedbackform.html',

      scope: {
        to: '=to',
      },

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.canSendFeedback = false;
        scope.formCollapsed = true;
        scope.alert = false;

        scope.feedbackForm = {
          to: undefined,
          text: ''
        };

        scope.openForm = function() {
          scope.formCollapsed = false;
        };

        scope.onCancel = function() {
          scope.feedbackForm.text = '';
          scope.formCollapsed = true;
          scope.alert = false;
        };

        scope.onSubmit = function() {
          if(!scope.feedbackForm.text.length) {
            scope.alert = {
              class: 'alert-danger',
              text: 'Вы не заполнили обязательные поля'
            };
            return;
          }

          scope.feedbackForm.to = scope.to;

          Feedback.create(scope.feedbackForm)
            .then(function(res) {

              var storedFeedbacks = localStorageService.get('feedbacks');
              if(!storedFeedbacks) {
                localStorageService.set('feedbacks', [
                  scope.feedbackForm.to
                ]);
              } else {
                storedFeedbacks.push(scope.feedbackForm.to);
                localStorageService.set('feedbacks', storedFeedbacks);
              }


              scope.alert = {
                class: 'alert-success',
                text: 'Ваш отзыв успешно размещен'
              };

              $timeout(function() {
                scope.alert = false;
                scope.feedbackForm.text = '';
                scope.formCollapsed = true;
                checkAccess();
              }, 3000);
            }, function(res) {
              scope.alert = {
                class: 'alert-danger',
                text: 'Произошла ошибка во время отправки вашего отзыва. Повторите позже.'
              };
            });
  
        };

        var checkAccess = function() {
          if('undefined' !== typeof $rootScope.userInfo && 'undefined' !== typeof ipCookie('sessionID')) {
            if($rootScope.userInfo.id !== scope.to) {
              var storedFeedbacks = localStorageService.get('feedbacks');
              var existFeedback = _(storedFeedbacks).find(function(id) {
                return id === scope.to;
              });

              if('undefined' === typeof existFeedback) {
                scope.canSendFeedback = true;
              } else {
                scope.canSendFeedback = false;
              }
            } else {
              scope.canSendFeedback = false;
            }
          } else {
            scope.canSendFeedback = false;
          }
        };

        scope.$watch('to', function() {
          checkAccess();
        });

        $rootScope.$watch('userInfo', function() {
          checkAccess();
        });

      }

    };
  
  }]);