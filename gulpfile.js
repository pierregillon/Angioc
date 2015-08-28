(function (require) {
    'use strict';

    var gulp = require('gulp');
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

}(require));