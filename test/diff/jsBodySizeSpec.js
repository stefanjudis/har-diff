
'use strict';

var fs = require( 'fs' );

module.exports = {
  jsBodySize : function( test ) {
    var har1   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de.har' ) );
    var har2   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de2.har' ) );

    var result = (require( '../../lib/diff/jsBodySize' ))( har1, har2 );

    test.strictEqual( result.description, 'Get compared JS bodySize values.' );

    test.strictEqual( result.diff.length, 2 );
    test.strictEqual( result.diff[ 0 ].file, 'goYAA.js' );
    test.strictEqual( result.diff[ 0 ].size, -32 );
    test.strictEqual( result.diff[ 1 ].file, 'jquery.min.js' );
    test.strictEqual( result.diff[ 1 ].size, -7 );

    test.strictEqual( result.values[ 0 ].length, 24 );
    test.strictEqual( result.values[ 1 ].length, 23 );

    test.done();
  }
};
