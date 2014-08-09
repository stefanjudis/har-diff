
'use strict';

var fs       = require( 'fs' );
var diffPath = './lib/diff';

// lets build up the diff methods
var files  = fs.readdirSync( diffPath );
var differ = {};

files.forEach( function( file ) {
  differ[ file.substring( -3 ) ] = require( './diff/' + file );
} );


module.exports =  differ;
