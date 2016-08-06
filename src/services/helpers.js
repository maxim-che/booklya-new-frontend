angular.module('booklya.services')
  .service('Helpers', [
    '$http',
    'apiConfig',
    Helpers
  ]);

function Helpers(apiConfig) {

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


};