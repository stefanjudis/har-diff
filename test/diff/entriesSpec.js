
'use strict';

var fs = require( 'fs' );

module.exports = {
  differentDomains : function( test ) {
    var har1   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de.har' ) );
    var har2   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de2.har' ) );

    var result = (require( '../../lib/diff/entries' ))( har1, har2 );

    test.strictEqual( result.description, 'Get diff for number of request entries.' );

    test.strictEqual( result.diff, 3 );

    test.strictEqual( result.values[ 0 ], 60 );
    test.strictEqual( result.values[ 1 ], 57 );

    test.done();
  }
};
