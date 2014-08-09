
'use strict';

var _      = require( 'lodash' );

/**
 * Diff different requested domains
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getDifferentDomains( har1, har2 ) {
  /**
   * Filter out domains
   *
   * @param  {Object} har har
   * @return {Array}     Array containing all the different domains
   */
  function getDomains( har ) {
    return _.reduce( har.log.entries, function( result, value ) {
              var match = value.request.url.match(
                /^http(s){0,1}:\/\/(.*?)\/.*$/
              );

              if (
                match && result.indexOf( match[ 2 ] ) === -1
              ) {
                result.push( match[ 2 ] );
              }

              return result;
            }, [] );
  }

  var domains1 = getDomains( har1 );
  var domains2 = getDomains( har2 );
  var same     = _.intersection( domains1, domains2 );
  var diff     = [
    _.difference( domains1, same ),
    _.difference( domains2, same )
  ];

  return {
    description : 'Get diff of different domains.',
    diff        : diff,
    values      : [
      domains1,
      domains2
    ]
  };
};
