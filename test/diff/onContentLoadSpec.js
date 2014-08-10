
'use strict';

var fs = require( 'fs' );

module.exports = {
  differentDomains : function( test ) {
    var har1   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de.har' ) );
    var har2   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de2.har' ) );

    var result = (require( '../../lib/diff/onContentLoad' ))( har1, har2 );

    test.strictEqual( result.description, 'Get diff for onContentLoad event.' );

    test.strictEqual( result.diff, -288.7558937072754 );

    test.strictEqual( result.values[ 0 ], 1952.8539180755615 );
    test.strictEqual( result.values[ 1 ], 1664.0980243682861 );

    test.done();
  }
};
