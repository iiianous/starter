var gulp 		= require('gulp');
var sass		= require('gulp-sass');
var server 		= require('gulp-server-livereload');
var $ 			= require('jQuery');
var browserSync = require('browser-sync').create();


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "starter.dev"
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('js', function() {
    return gulp.src("app/js/*.js")
        .pipe(gulp.dest("app/dist"));
        // .pipe(browserSync.stream());
});

// Static Server + watching scss/html/js files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/js/*.js", ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);

