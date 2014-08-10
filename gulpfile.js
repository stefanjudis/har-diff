
'use strict';

// Require the needed packages
var gulp        = require( 'gulp' );

var coveralls   = require( 'gulp-coveralls' );
var istanbul    = require( 'gulp-istanbul' );
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
      ],
      nodeunit : [
        'lib/**/*.js'
      ]
    };


/**
 * Setup coveralls
 */
gulp.task( 'coveralls', [ 'test' ], function() {
  gulp.src( 'coverage/**/lcov.info' )
    .pipe( coveralls() );
} );


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
gulp.task( 'nodeunit', [ 'jshint' ], function ( callback ) {
  gulp.src( 'lib/**/*.js' )
    .pipe( istanbul() )
    .on( 'finish', function() {
      gulp.src( 'test/**/*.js' )
        .pipe( nodeunit() )
        .pipe( istanbul.writeReports(
          {
            dir        : './coverage',
            reporters  : [ 'lcov', 'json', 'text', 'text-summary' ],
            reportOpts : { dir: './coverage' }
          }
        ) )
        .on( 'end', callback );
    } );
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

  // run test suite on any lib
  gulp.watch( PATHS.nodeunit, [ 'nodeunit' ] );
} );
