var gulp = require('gulp');
// var sass = require('gulp-sass');
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


/* START CSS */
//compile 
gulp.task('sass', function () {
    return gulp.src('assets/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('output/css/'))
});



/* END CSS */



/* START JS */
gulp.task('buildjs', function () {
    return gulp.src('assets/js/**/**/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('output/js/'))
        .pipe(rename('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('output/js/'));
});

//Watch task
gulp.task('watch', function () {
    /* WATCHING CHANGES PRINCIPAL FILE */
    gulp.watch('assets/scss/**/**/**/*.scss', gulp.parallel(['sass']));
    gulp.watch('assets/js/**/**/**/*.js', gulp.parallel(['buildjs']));

});

gulp.task('default', gulp.series('sass', 'buildjs', 'watch'));