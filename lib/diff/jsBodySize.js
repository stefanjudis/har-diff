
'use strict';

var _ = require( 'lodash' );

/**
 * Diff jsBodySize
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getOnLoad( har1, har2 ) {
  /**
   * Filter out JS files
   *
   * @param  {Object} har   har
   * @parem  {Number} index index
   * @return {Array}        Array containing all js files and sizes
   */
  function getjsFiles ( har, index ) {
    var jsFiles =  _.reduce( har.log.entries , function( result, value ) {
                      var match = value.request.url.match(
                        /^http(s){0,1}:\/\/.*\/(.*\.js)(\?{1}.*){0,1}$/
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

    return _.sortBy( jsFiles, 'size' );
  }

  var jsFiles1 = getjsFiles( har1, 0 );
  var jsFiles2 = getjsFiles( har2, 1 );
  var diff      = _.chain( jsFiles1.concat( jsFiles2 ) )
                    .groupBy( function( item ) {
                      return item.file;
                    } )
                    .reduce( function( result, item, key ) {
                      // determine if a new stylesheet was
                      // added or if one was removed
                      if ( item.length === 1 ) {
                        result.push( {
                          file : key,
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
                          file : key,
                          size : item[ 1 ].size - item[ 0 ].size
                        } );
                      }

                      return result;
                    }, [] )
                    .value();

  return {
    description : 'Get compared JS bodySize values.',
    diff        : diff,
    values      : [
      _.map( jsFiles1, function( item ) {
        delete item.index;

        return item;
      } ),
      _.map( jsFiles2, function( item ) {
        delete item.index;

        return item;
      } )
    ]
  };
};
