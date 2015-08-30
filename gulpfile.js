(function (require) {
    'use strict';

    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var mocha = require('gulp-mocha');
    var karma = require('karma');

    gulp.task('test-node', function () {
        return startMochaServer();
    });

    gulp.task('test-web', function (callback) {
        return startKarmaServer(true, callback);
    });

    gulp.task('test-web-dev', function (callback) {
        return startKarmaServer(false, callback);
    });

    gulp.task('test', ['test-node', 'test-web']);
    gulp.task('test-dev', ['test-web-dev']);

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

    // ----- Internal logic
    function startKarmaServer(singleRun, callback){
        var server = new karma.Server({
            configFile: __dirname + '/karma.conf.js',
            files: [
                './src/angioc.js',
                './src/angioc.web.spec.js',
                './src/angioc.spec.js',
            ],
            singleRun: singleRun
        }, callback);
        return server.start();
    }
    function startMochaServer(){
        return gulp
            .src('./src/**/*.node.spec.js', {read: false})
            .pipe(mocha());
    }

}(require));