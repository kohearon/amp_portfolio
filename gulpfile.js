var gulp = require('gulp');

/* Browsersync Stuff */
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

/* Styles */
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var plugins = [
     autoprefixer({browsers: ['last 1 version']}),
     cssnano()
 ];

/* Minification */
var htmlmin = require('gulp-htmlmin');

gulp.task('styles', function(){
  return gulp.src('index.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'))
});

gulp.task('styles-watch', ['styles'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html', function(){
  return gulp.src('index.amp.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});

/* Basic Serving Using Browsersync */
gulp.task('default', ['styles', 'html'], function () {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.amp.html"
        }
    });

	gulp.watch(['./styles/*.scss', 'index.scss'], ['styles']);
	gulp.watch('index.amp.html', ['html']);
});
