var gulp = require('gulp');

/* Styles */
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var plugins = [
     autoprefixer({browsers: ['last 1 version']}),
     cssnano()
 ];


gulp.task('styles', function(){
  return gulp.src('index.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'))
});

/* Watch Task For All Others */
gulp.task('watch', function(){
  gulp.watch(['./styles/*.scss', 'index.scss'], ['styles']);
});

gulp.task('default', ['styles'], function(){});
