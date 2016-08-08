angular.module('booklya.services')
  .service('Helpers', [
    'apiConfig',
    '$rootScope',
    'ipCookie',
    'Auth',
    Helpers
  ]);

function Helpers(apiConfig, $rootScope, ipCookie, Auth) {

  this.trimText = function(text, len, dots) {
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

  this.formatDate = function(date, format) {
    return moment.unix(date).format(format);
  };

  this.getUserFullname = function(user) {
    if(_(user).isObject()) {
      return user.firstName + ' ' + user.lastName;
    }
    return user;
  };

  this.getBaseState = function(stateName) {
    var stateParts = stateName.split('.');
    return stateParts[0];
  };

  this.updateUserInfo = function(callback) {
    return Auth.userInfo(ipCookie('sessionID'))
      .then(function(res) {
        $rootScope.userInfo = res.data;
        callback()
      }, function(res) {

      });
  }

  this.me = function(id, callback) {
    var result = false;
    if('undefined' !== typeof ipCookie('sessionID')) {
      if('undefined' === typeof $rootScope.userInfo) {
        this.updateUserInfo(function() {
          if($rootScope.userInfo.id === id) {
            result = true;
          } else {
            result = false;
          }
          callback(result);
        });        
      } else {
          if($rootScope.userInfo.id === id) {
            result = true;
          } else {
            result = false;
          }        
      }
    }

    callback(result);
  }

};