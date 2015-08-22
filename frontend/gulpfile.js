var _ = require('lodash');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var cache = require('gulp-cached');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var libFiles = [
    'jquery/dist/jquery.js',
    'angular/angular.js',
    'angular-bootstrap/ui-bootstrap-tpls.js',
    'underscore/underscore.js'
];

libFiles = _.map(libFiles, function (x) { return 'src/assets/lib/' + x; });

gulp.task('static', function() {
    gulp.src('src/assets/img/**/*')
        .pipe(cache('img', {optimizeMemory: true}))
        .pipe(gulp.dest('build/assets/img'));
    gulp.src('src/assets/lib/**/*')
        .pipe(cache('lib', {optimizeMemory: true}))
        .pipe(gulp.dest('build/assets/lib'));
});

gulp.task('js-lib', function() {
    gulp.src(libFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/assets/js'))
});

gulp.task('ts', function() {
    var tsResult = gulp.src('src/assets/js/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true
        }));
    tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/assets/js'));
});

gulp.task('sass', function() {
    gulp.src('src/assets/css/app.scss')
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest('build/assets/css'));
});

gulp.task('jade', function() {
    gulp.src('src/assets/html/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('build/assets/html'));
    gulp.src('src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('src/assets/img/**/*', ['static']);
    gulp.watch('src/assets/lib/**/*', ['static']);
    gulp.watch('src/assets/lib/**/*', ['js-lib']);
    gulp.watch('src/assets/js/**/*.ts', ['ts']);
    gulp.watch('src/assets/css/**/*.scss', ['sass']);
    gulp.watch('src/assets/html/**/*.jade', ['jade']);
    gulp.watch('src/index.jade', ['jade']);
});

gulp.task('default', ['ts', 'js-lib', 'static', 'sass', 'jade'], function() {});
