
'use strict';

var _ = require( 'lodash' );

/**
 * Diff cssSize
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getOnLoad( har1, har2 ) {
  /**
   * Filter out css files
   *
   * @param  {Object} har har
   * @return {Array}      Array containing all css files and sizes
   */
  function getCssFiles ( har, index ) {
    var cssFiles =  _.reduce( har.log.entries , function( result, value ) {
                      var match = value.request.url.match(
                        /^http(s){0,1}:\/\/.*\/(.*.css).*$/
                      );

                      if ( match ) {
                        result.push( {
                          file  : match[ 2 ],
                          index : index,
                          size  : value.response.bodySize
                        } );
                      }

                      return result;
                    }, [] );

    return _.sortBy( cssFiles, 'size' );
  }

  var cssFiles1 = getCssFiles( har1, 0 );
  var cssFiles2 = getCssFiles( har2, 1 );
  var diff      = _.chain( cssFiles1.concat( cssFiles2 ) )
                    .groupBy( function( item ) {
                      return item.file;
                    } )
                    .reduce( function( result, item, name ) {
                      // determine if a new stylesheet was
                      // added or if one was removed
                      if ( item.length === 1 ) {
                        result.push( {
                          file : name,
                          size : ( item[ 0 ].index === 0 ) ?
                                  item[ 0 ].size * -1 :
                                  item[ 0 ].size
                        } );
                      }

                      // determine diff of the changes
                      if (
                        item.length === 2 &&
                        item[ 0 ].size !== item[ 1 ].size
                      ) {
                        result.push( {
                          file : name,
                          size : item[ 1 ].size - item[ 0 ].size
                        } );
                      }

                      return result;
                    }, [] )
                    .value();

  return {
    description : 'Get compared CSS bodySize values.',
    diff        : diff,
    values      : [
      cssFiles1,
      cssFiles2
    ]
  };
};
