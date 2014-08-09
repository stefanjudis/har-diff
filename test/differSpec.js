
'use strict';

module.exports = {
  differ : function( test ) {
    var differ = require( '../lib/differ' );

    test.strictEqual( typeof differ, 'object' );

    test.done();
  }
};
