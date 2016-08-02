angular.module('booklya.services')
  .service('Breadcrumbs', [
    '$rootScope',
    Breadcrumbs
  ]);

function Breadcrumbs($rootScope) {

  var _breadcrumbs = [];

  this.addItem = function(item) {
    var existsItem = _(_breadcrumbs).findWhere({ state: item.state });
    if('undefined' === typeof existsItem) {
      _breadcrumbs.push(item);
    }
  };
  
  this.removeItem = function(state) {
    var existsItem = _(_breadcrumbs).findWhere({ state: state });
    if('undefined' === typeof existsItem) {
      delete existsItem;
    }
  };

  this.clear = function() {
    _breadcrumbs = [];
  };
   
  this.all = function() {
    return _breadcrumbs;
  };

};