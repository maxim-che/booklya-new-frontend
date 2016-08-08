angular
  .module('booklya.directives')
  .directive('bkComments', [ 'apiConfig', 'Comment', 'ipCookie', '$timeout', 'Helpers', function(apiConfig, Comment, ipCookie, $timeout, Helpers) {
    return {
      transclude: true,
      scope: {
        type: '@',
        id: '=',
        comments: '='
      },

      templateUrl: '/views/comments.html',

      link: function(scope, element, attrs) {

        angular.extend(scope, Helpers);
    
        scope.baseUrl = apiConfig.baseUrl;

        scope.alert = false;

        scope.form = {
          text: ''
        };

        scope.access = 'undefined' !== typeof ipCookie('sessionID') ? true : false;


        scope.onSubmit = function() {
          if(!scope.form.text.length) {
            scope.alert = {
              class: 'alert-danger',
              text: 'Нельзя отправлять пустой комментарий'
            }
            return;
          }

          Comment.create({
            text: scope.form.text,
            type: scope.type,
            id: scope.id
          })
          .then(function(res) {
            scope.alert = {
              class: 'alert-success',
              text: 'Комментарий успешно отправлен'
            };

            $timeout(function() {
              scope.alert = false;
              scope.form.text = '';
            }, 3000);
          }, function(res) {
            scope.alert = {
              class: 'alert-danger',
              text: 'Произошла ошибка. Повторите позже.'
            };
            console.log('ERR >>>>>>>>>>>>>>>', res);
          });
        }

      }

    }
  }]);
