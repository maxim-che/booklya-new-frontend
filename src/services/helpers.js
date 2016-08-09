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

  this.translit = function(str) {
    // Символ, на который будут заменяться все спецсимволы
    var space = '-'; 
    // Берем значение из нужного поля и переводим в нижний регистр
    var text = str.toLowerCase();
         
    // Массив для транслитерации
    var transl = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 
    'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
    'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
    ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
    '#': space, '$': space, '%': space, '^': space, '&': space, '*': space, 
    '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space, 
    ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
    '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
    '?': space, '<': space, '>': space, '№':space
    }
                    
    var result = '';
    var curent_sim = '';
                    
    for(i=0; i < text.length; i++) {
        // Если символ найден в массиве то меняем его
        if(transl[text[i]] != undefined) {
             if(curent_sim != transl[text[i]] || curent_sim != space){
                 result += transl[text[i]];
                 curent_sim = transl[text[i]];
                                                            }                                                                            
        }
        // Если нет, то оставляем так как есть
        else {
            result += text[i];
            curent_sim = text[i];
        }                              
    }  

    return result;        
  };

  this.simpleSlideGrid = function(limit, collection) {
    var slides = [];

    var slide = [];
    _(collection).each(function(item) {
      slide.push(item);
      if(slide.length === limit) {
        slides.push(slide);
        slide = [];
      }
    });

    return slides;
  };
};