var gulp       = require('gulp');
var concat     = require('gulp-concat');
var sass       = require('gulp-sass');
var copy       = require('gulp-copy');
var livereload = require('gulp-livereload');
var clean      = require('gulp-clean');
var path       = require('path');

var destPath  = './dist/';
var srcPath   = './src';
var bowerPath = './bower_components';

var express   = require('express');
var app       = express();

gulp.task('js:concat', function() {
  return gulp.src([
      path.join(bowerPath, 'moment', 'min', 'moment-with-locales.js'),
      path.join(bowerPath, 'jquery', 'dist', 'jquery.min.js'),
      path.join(bowerPath, 'fullcalendar', 'dist', 'fullcalendar.min.js'),
      path.join(bowerPath, 'fullcalendar', 'dist', 'gcal.js'),
      path.join(bowerPath, 'fullcalendar', 'dist', 'lang', 'ru.js'),

      path.join(bowerPath, 'angular', 'angular.js'),
      path.join(bowerPath, 'underscore', 'underscore.js'),
      path.join(bowerPath, 'angular-bootstrap', 'ui-bootstrap.js'),
      path.join(bowerPath, 'angular-bootstrap', 'ui-bootstrap-tpls.js'),
      path.join(bowerPath, 'angular-ui-router', 'release', 'angular-ui-router.js'),
      path.join(bowerPath, 'angular-sanitize', 'angular-sanitize.js'),
      path.join(bowerPath, 'angular-touch', 'angular-touch.js'),
      path.join(bowerPath, 'angular-cookie', 'angular-cookie.js'),
      path.join(bowerPath, 'angular-carousel', 'dist', 'angular-carousel.js'),

      // TEMPORARY CALENDAR STUFF
      path.join(bowerPath, 'angular-ui-calendar', 'src', 'calendar.js'),


      path.join(srcPath, 'app.module.js'),
      path.join(srcPath, 'app.const.' + process.env.NODE_ENV + '.js'),
      path.join(srcPath, 'app.config.js'),
      path.join(srcPath, 'app.const.js'),
      path.join(srcPath, 'app.filters.js'),
      path.join(srcPath, 'services', '*.js'),
      path.join(srcPath, 'directives', '**', '*.js'),
      path.join(srcPath, 'controllers', '**', '*.js')
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.join(destPath, 'js')));
});

gulp.task('scss:compile', function() {
  return gulp.src([
    path.join(bowerPath, 'angular', 'angular-csp.css'),
    path.join(bowerPath, 'bootstrap', 'dist', 'css', 'bootstrap.css'),
    path.join(bowerPath, 'bootstrap', 'dist', 'css', 'bootstrap-theme.css'),
    path.join(bowerPath, 'angular-bootstrap', 'ui-bootstrap-csp.css'),
    path.join(bowerPath, 'fullcalendar', 'dist', 'fullcalendar.css'),
    path.join(srcPath, 'scss', 'style.scss')
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(gulp.dest(path.join(destPath, 'css')))
  .pipe(livereload());
});

gulp.task('copy:fonts', function() {
  return gulp.src([
    path.join(bowerPath, 'bootstrap', 'dist', 'fonts', '*'),
    path.join(bowerPath, 'font-awesome', 'fonts', '*')
  ])
  .pipe(copy(path.join(destPath, 'fonts'), { prefix: 4 }));
})

gulp.task('copy:src:fonts', function() {
  return gulp.src([
    path.join(srcPath, 'fonts', '*'),
  ])
  .pipe(copy(path.join(destPath, 'fonts'), { prefix: 2 }));
})

gulp.task('copy:src:images', function() {
  return gulp.src([
    path.join(srcPath, 'img', '*'),
  ])
  .pipe(copy(path.join(destPath, 'img'), { prefix: 2 }));
})

gulp.task('copy:index', function() {
  return gulp.src([
    path.join(srcPath, 'index.html'),
  ])
  .pipe(copy(path.join(destPath), { prefix: 1 }));
});

gulp.task('copy:templates', function() {
  return gulp.src([
    path.join(srcPath, 'views', '**', '*.html'),
    path.join(srcPath, 'directives', '**', '*.html'),
  ])
  .pipe(copy(path.join(destPath, 'views'), { prefix: 3 }));
});

gulp.task('watch', function() {
  livereload.listen({ port: 35729 });
  app.use(express.static(destPath));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, destPath, 'index.html'));
  });
  app.listen(3000);
  gulp.watch([
    path.join(srcPath, '**', '*.js'),
    path.join(srcPath, 'scss', '**', '*.scss'),
    path.join(srcPath, 'img', '**', '*'),
    path.join(srcPath, 'views', '**', '*.html'),
    path.join(srcPath, 'services', '*.js'),
    path.join(srcPath, 'controllers', '**', '*.js'),
    path.join(srcPath, 'directives', '**', '*.js'),
    path.join(srcPath, 'directives', '**', '*.html'),
    path.join(srcPath, 'index.html')
  ], [ 
    'js:concat',
    'scss:compile',
    'copy:fonts',
    'copy:src:fonts',
    'copy:templates',
    'copy:index',
    'copy:src:images'
  ]).on('change', reload);

  var timer = null;

  function reload() {
    var reload_args = arguments;

    // Stop timeout function to run livereload if this function is ran within the last 250ms
    if (timer) clearTimeout(timer);

    // Check if any gulp task is still running
    if (!gulp.isRunning) {
      timer = setTimeout(function() {
        livereload.changed.apply(null, reload_args);
      }, 350);
    }    
  }
});

gulp.task('build', [ 
  'js:concat',
  'scss:compile',
  'copy:fonts',
  'copy:src:fonts',
  'copy:templates',
  'copy:src:images'
]);

gulp.task('set-env-dev', function() {
    return process.env.NODE_ENV = 'dev';
});

gulp.task('set-env-prod', function() {
    return process.env.NODE_ENV = 'prod';
});

gulp.task('default', [ 'set-env-dev', 'build', 'watch' ]);
gulp.task('prod', [ 'set-env-prod', 'build', 'watch' ]);