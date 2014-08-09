
'use strict';

// Require the needed packages
var gulp        = require( 'gulp' );
var jshint      = require( 'gulp-jshint' );
var nodeunit    = require( 'gulp-nodeunit' );

    // all paths for watching and regeneration
var PATHS      = {
      jshint   : [
        'gulpfile.js',
        'har-diff.js',
        'lib/**/*.js',
        'test/**/*.js',
        'bin/har-diff'
      ]
    };


/**
 * Setup jshint
 */
gulp.task( 'jshint', function() {
  return gulp.src( PATHS.jshint )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'jshint-stylish' ) );
} );


/**
 * Setup nodeunit
 */
gulp.task( 'nodeunit', function () {
  gulp.src( 'test/**/*.js')
    .pipe( nodeunit() );
} );


/**
 * Setup test
 */
gulp.task( 'test', [ 'jshint', 'nodeunit' ] );


/**
 * Setup watcher
 */
gulp.task( 'watch', function() {
  // check JS for JSHINT errors
  gulp.watch( PATHS.jshint, [ 'jshint' ] );
} );
