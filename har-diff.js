
'use strict';

var fs     = require( 'fs' );
var differ = require( './lib/differ' );


/**
 * Get diff of two har files
 *
 * @param  {String|Object} har1 file path to har file or already parsed har file
 * @param  {String|Object} har2 file path to har file or already parsed har file
 * @return {Object}        object containing various diff values
 */
function getDiff( har1, har2 ) {
  var diff    = {};

  if ( typeof har1 === 'string' ) {
    har1 = JSON.parse( fs.readFileSync( har1, { encoding : 'utf8' } ) );
  }

  if ( typeof har2 === 'string' ) {
    har2 = JSON.parse( fs.readFileSync( har2, { encoding : 'utf8' } ) );
  }

  for( var method in differ ) {
    if ( differ.hasOwnProperty( method ) ) {
      diff[
        method.substr( 0, method.length - 3 )
      ] = differ[ method ]( har1, har2 );
    }
  }

  return diff;
}


module.exports = getDiff;
