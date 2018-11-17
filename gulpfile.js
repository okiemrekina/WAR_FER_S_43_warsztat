const gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');


//sass.compiler = require('node-sass');

function showError(err) {
    notifier.notify({
        title: 'Błąd SASS',
        message: err.messageFormatted
      });

      console.log(c.red('=============ERROR========================='));
      console.log(c.red(err.messageFormatted));
}

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested' //use compressed style
        }).on('error', showError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream()); //compile sass into css & auto-inject into browser
});

// All scss
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false, //czy pokazywac tooltipa
        //
        chrome: '-browser'
    });
});

// Default 'my hello'
gulp.task('default', function() {
    console.log(c.green('======== Starting work ========'));
    gulp.start( ['browser-sync', 'sass', 'watch'] );
})