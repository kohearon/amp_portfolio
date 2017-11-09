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
var removeComments = require('gulp-remove-html-comments');

var inject = require('gulp-inject');

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

/* Our HTML Function Must Wait Until Styles Have Been
 * Transpiled As It Injects These Styles Into Our Amp
 * File
*/
gulp.task('html', ['styles'], function(){
  return gulp.src('index.amp.html')
	.pipe(inject(gulp.src(['./dist/index.css']), {
		starttag: '<!-- inject:head:css -->',
		transform: function (filePath, file) {
			return file.contents.toString('utf8')
        }
    }))
    .pipe(removeComments())
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('images', function() {
    return gulp.src('assets/images/*.jpg')
        .pipe(gulp.dest('dist/assets/images/'))
});

gulp.task('images-watch', ['images'], function (done) {
    browserSync.reload();
    done();
});


/* Basic Serving Using Browsersync */
gulp.task('default', ['styles', 'html', 'images'], function () {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.amp.html"
        }
    });

    /* When Styles Change We Have To Inject Again */
	gulp.watch(['./styles/*.scss', 'index.scss'], ['html-watch']);
	gulp.watch('index.amp.html', ['html-watch']);
	gulp.watch('assets/images*.jpg', ['images']);
});
