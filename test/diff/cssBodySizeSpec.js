
'use strict';

var fs = require( 'fs' );

module.exports = {
  cssBodySize : function( test ) {
    var har1   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de.har' ) );
    var har2   = JSON.parse( fs.readFileSync( './test/src/4waisenkinder.de2.har' ) );

    var result = (require( '../../lib/diff/cssBodySize' ))( har1, har2 );

    test.strictEqual( result.description, 'Get compared CSS bodySize values.' );

    test.strictEqual( result.diff.length, 3 );
    test.strictEqual( result.diff[ 0 ].file, 'addedStyleInFirstHar.css' );
    test.strictEqual( result.diff[ 0 ].size, -111 );
    test.strictEqual( result.diff[ 1 ].file, 'jquery.fancybox.css' );
    test.strictEqual( result.diff[ 1 ].size, -398 );
    test.strictEqual( result.diff[ 2 ].file, 'addedStyleInSecondHar.css' );
    test.strictEqual( result.diff[ 2 ].size, 222 );

    test.strictEqual( result.values[ 0 ].length, 6 );
    test.strictEqual( result.values[ 1 ].length, 6 );

    test.done();
  }
};
