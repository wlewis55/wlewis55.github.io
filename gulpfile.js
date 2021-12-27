var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();

const { series } = require('gulp');


//compile scss into css
function style() {
    return gulp.src('assets/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
           index: "index.html"
        }
    });
    gulp.watch('assets/scss/*.scss', style)
    gulp.watch(['*.html','portfolio/*']).on('change',browserSync.reload);
    gulp.watch(['assets/js/*.js', 'assets/vendor/**/*.js']).on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;

exports.default = series(style, watch);