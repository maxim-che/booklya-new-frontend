angular.module('booklya.directives')
  .directive('bkImageUploader', [ '$timeout', function($timeout) {
    
    return {

      templateUrl: '/views/imageuploader.html',

      scope: {
        width: '@',
        height: '@',
        cover: '='
      },

      restrict:'E',

      link: function(scope, element, attrs) {

        scope.imageData = '';
        scope.initCrop = false;
        scope.imageCropResult = null;
        scope.imageCropResultBlob = null;
        scope.imageCropStep = 1;
        scope.cropperSize = {
          width: scope.width,
          height: scope.height
        };

        var fileInput = angular.element('<input type="file" name="image-file"/>');
        var fileReader = new FileReader();
        var dropContainer = element.find('.drop-container')[0];

        angular.element(dropContainer).height(scope.height);

        angular.element(dropContainer).on('dragover', function(e) {
          e.stopPropagation();
          e.preventDefault();
        });

        angular.element(dropContainer).on('dragleave', function(e) {
          e.stopPropagation();
          e.preventDefault();
        });

        angular.element(dropContainer).on('drop', function(e) {
          e.preventDefault();
          fileReader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
        });


        fileReader.onload = function(e) {
          scope.imageData = e.target.result;
          scope.$apply();
        };


        fileInput.bind('change', function(e) {
          var file = e.target.files[0];
          fileReader.readAsDataURL(file);
        });

        var img = document.querySelector('.image-crop-final');

        scope.saveImage = function() {
          scope.initCrop = true;
          var img = document.querySelector('.image-crop-final');
          img.onload = function() {
            scope.cover = this.src;
            scope.$apply();
          };
       };

        fileReader.onload = function(e) {
          scope.imageData = e.target.result;
          scope.$apply();
        };

        scope.cancelImage = function() {
          scope.imageData = '';
          scope.imageCropResult = null;
          scope.imageCropStep = 1;
          scope.initCrop = false;
        };

        scope.onClick = function() {
          fileInput.click();
        };

      }

    };
  
  }]);