angular
  .module('booklya')
  .controller('ProfileNewArticleCtrl', [ 
    '$scope',
    '$state',
    'Article',
    'Profile',
    'Category',
    'Helpers',
    ProfileNewArticleCtrl 
  ]);

function ProfileNewArticleCtrl($scope, $state, Article, Profile, Category, Helpers) {

  $scope.categories = [];
  $scope.subjects = [];
  $scope.alert = false;

  $scope.form = {
    title: '',
    text: '',
    date: new Date(),
    subjectCategory: '',
    subject: '',
    cover: '',
    seo: {
      alias: '',
      keywords: '',
      description: ''
    }
  };   

  Category.getAll()
    .then(function(res) {
      $scope.categories = res.data;
      if($scope.categories.length) {
        $scope.form.subjectCategory = $scope.categories[0].id;
        $scope.getSubjects($scope.form.subjectCategory);
      }
    }, function(res) {
      console.log('ERR >>>>>>>>>>>>>>>', res);
    });

  $scope.getSubjects = function(id) {
    Category.getSubjects(id)
      .then(function(res) {
        $scope.subjects = res.data;
        if($scope.subjects.length) {
          $scope.form.subject = $scope.subjects[0].id;
        }
      }, function(res) {
        console.log('ERR >>>>>>>>>>>>>>>', res);
      });    
  };

  $scope.onCategoryChange = function() {
    $scope.getSubjects($scope.form.subjectCategory);
  };

  $scope.onChangeTitle = function() {
    $scope.form.seo.alias = Helpers.translit($scope.form.title);
  };

  $scope.onSubmit = function() {
    if(!$scope.form.title.length) {
      $scope.alert = {
        class: 'alert-danger',
        text: 'Не заполнено поле "Заголовок"'
      };
      return;
    }

    if(!$scope.form.text.length) {
      $scope.alert = {
        class: 'alert-danger',
        text: 'Нельзя сохранить пустую статью'
      };
      return;      
    }

    Article.create($scope.form)
      .then(function(res) {
        $state.go('profile.articles', { id: $state.params.id });
      }, function(res) {
        $scope.alert = {
          class: 'alert-danger',
          text: 'Во время сохранения произошла ошибка. Повторите позже.'
        };
      });
  };

};