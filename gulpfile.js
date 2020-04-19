const gulp = require('gulp');
const sass = require('gulp-sass');

function style() {
  return gulp
    .src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css'));
}

function watch() {
  gulp.watch('./assets/scss/**/*.scss', style);
  gulp.watch('./*.html');
}
exports.style = style;
exports.watch = watch;
