
'use strict';

var fs = require( 'fs' );

module.exports = {
  differentDomains : function( test ) {
    var har1   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de.har' ) );
    var har2   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de2.har' ) );

    var result = (require( '../../lib/diff/onLoad' ))( har1, har2 );

    test.strictEqual( result.description, 'Get diff for onLoad event.' );

    test.strictEqual( result.diff, -9258.947134017944 );

    test.strictEqual( result.values[ 0 ], 3887.2768878936768 );
    test.strictEqual( result.values[ 1 ], 13146.224021911621 );

    test.done();
  }
};
