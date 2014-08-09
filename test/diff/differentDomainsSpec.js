
'use strict';

var fs = require( 'fs' );

module.exports = {
  differentDomains : function( test ) {
    var har1   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de.har' ) );
    var har2   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de2.har' ) );

    var result = (require( '../../lib/diff/differentDomains' ))( har1, har2 );

    test.strictEqual( result.description, 'Get diff of different domains.' );

    test.strictEqual( result.diff.length, 2 );
    test.strictEqual( result.diff[ 0 ][ 0 ], 'gotYA.com' );
    test.strictEqual( result.diff[ 1 ][ 0 ], 'gotYATWICE.com' );

    test.strictEqual( result.values[ 0 ].length, 21 );
    test.strictEqual( result.values[ 1 ].length, 21 );

    test.done();
  }
};
