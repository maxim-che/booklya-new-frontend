angular
  .module('booklya')
  .factory('httpCookieInterceptor',['$rootScope', 'apiConfig', 'ipCookie', function ($rootScope, apiConfig, ipCookie) {
    return {
      request: function(request) {
        if(request.method !== 'GET') {
          if('undefined' !== typeof request.data && 'undefined' !== typeof ipCookie('sessionID')) {
            request.data['sessionID'] = ipCookie('sessionID');
          }
        } else {
          if(request.url.indexOf(apiConfig.url) !== -1 && 'undefined' !== typeof ipCookie('sessionID')) {
            if(request.url.indexOf('?') !== -1) {
              request.url += '&sessionID=' + ipCookie('sessionID');
            } else {
              request.url += '?sessionID=' + ipCookie('sessionID');
            }
          } 
        }
        return request;
      },
      response: function(response) {
        return response;
      }
    };
  }]);