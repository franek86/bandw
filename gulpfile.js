var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin');

/** launch server */
gulp.task('browser-sync', ['sass'], function(){
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

/** concat javascripts bower_components and custom.js in one file*/
gulp.task('scripts', function(){
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/fullpage.js/dist/jquery.fullpage.min.js',
        'assets/js/custom.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream: true}));
});

 /** compile scss files into css files */
 gulp.task('sass', function(){
     return gulp.src('assets/css/main.scss')
        .pipe(sass({
            inludePaths: ['css'],
            style: 'compressed',
            onError: browserSync.notify
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(cleanCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream: true}));
 });

 /** jade task */
 gulp.task('jade', function(){
     return gulp.src('./jade/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'))
        .pipe(reload({stream: true}));
 });

 /** compress images */
 gulp.task('image', function(){
     return gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
 });

 /** watch chnages in css, js, jade files */
 gulp.task('watch', function(){
     gulp.watch('assets/css/**/*', ['sass']);
     gulp.watch('assets/js/*.js', ['scripts']);
     gulp.watch(['./jade/includes/*.jade', './jade/index.jade'], ['jade']);
 });

gulp.task('default', ['browser-sync', 'scripts','jade', 'image', 'watch']);
