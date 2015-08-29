(function (require) {
    'use strict';

    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var karma = require('karma');

    gulp.task('test', function (callback) {
        var server = new karma.Server({
            configFile: __dirname + '/karma.conf.js',
        }, callback);
        return server.start();
    });

    gulp.task('test-dev', function (callback) {
        var server = new karma.Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: false
        }, callback);
        return server.start();
    });

    gulp.task('test-example', function (callback) {
        var server = new karma.Server({
            configFile: __dirname + '/karma.conf.js',
            files: [
                './src/angioc.js',
                './example/**/*.js'
            ]
        }, callback);
        return server.start();
    });

    gulp.task('build', function () {
        return gulp
            .src('./src/angioc.js')
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest('./dist/'))
    });

}(require));