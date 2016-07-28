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

gulp.task('bower:concat', function() {
  return gulp.src([
      path.join(bowerPath, 'angular', 'angular.js'),
      path.join(bowerPath, 'underscore', 'underscore.js')
    ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(path.join(destPath, 'js')));
});

gulp.task('scss:compile', function() {
  return gulp.src([
    path.join(bowerPath, 'angular', 'angular-csp.css'),
    path.join(bowerPath, 'bootstrap', 'dist', 'css', 'bootstrap.css'),
    path.join(bowerPath, 'bootstrap', 'dist', 'css', 'bootstrap-theme.css'),
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

gulp.task('copy:templates', function() {
  return gulp.src([
    path.join(srcPath, 'index.html'),
    path.join(srcPath, 'templates', '*'),
  ])
  .pipe(copy(path.join(destPath), { prefix: 1 }));
});

gulp.task('watch', function() {
  livereload.listen({ port: 35729 });
  app.use(express.static(destPath));
  app.listen(3000);
  gulp.watch([
    path.join(srcPath, 'scss', '**', '*.scss'),
    path.join(srcPath, 'templates', '**', '*.html'),
    path.join(srcPath, 'templates', '*'),
    path.join(srcPath, 'index.html')
  ], [ 
    'bower:concat',
    'scss:compile',
    'copy:fonts',
    'copy:src:fonts',
    'copy:templates'
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
  'bower:concat',
  'scss:compile',
  'copy:fonts',
  'copy:src:fonts',
  'copy:templates'
]);

gulp.task('default', [ 'build', 'watch' ]);