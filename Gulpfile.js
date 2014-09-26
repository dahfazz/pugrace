var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    minifycss   = require('gulp-minify-css'),
    rename      = require('gulp-rename');

gulp.task('sass', function() {
  return gulp.src('assets/sass/*.scss')
    .pipe(sass({ style: 'assets/expanded' }))
    .pipe(gulp.dest('assets/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});


gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch'], function() {}); 