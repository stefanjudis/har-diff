
'use strict';

var _ = require( 'lodash' );

/**
 * Diff image types and depending sizes
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getOnLoad( har1, har2 ) {
  /**
   * Filter out image files
   *
   * @param  {Object} har har
   * @parem  {Number} index index
   * @return {Array}        Array containing all js files and sizes
   */
  function getImageFiles ( har, index ) {
    var imageFiles =  _.chain( har.log.entries )
                        .reduce( function( result, value ) {
                          var index = _.findIndex(
                            value.response.headers,
                            function( value ) {
                              return value.name.match( /^[cC]ontent\-[tT]ype$/ );
                            }
                          );

                          if (
                            index !== -1 &&
                            (
                              value.response.headers[ index ].value.match( /image\/jpeg/i ) ||
                              value.response.headers[ index ].value.match( /image\/pjpeg/i ) ||
                              value.response.headers[ index ].value.match( /image\/png/i ) ||
                              value.response.headers[ index ].value.match( /image\/gif/i ) ||
                              value.response.headers[ index ].value.match( /image\/svg\+xml/i ) ||
                              value.response.headers[ index ].value.match( /image\/vnd\.djvu/i ) ||
                              value.response.headers[ index ].value.match( /image\/example/i )
                            )
                          ) {
                            if ( result[ value.response.headers[ index ].value ] === undefined ) {
                              result[ value.response.headers[ index ].value ] = {
                                size  : 0,
                                count : 0,
                                foo   : ''
                              }
                            }

                            result[ value.response.headers[ index ].value ].size += value.response.bodySize;
                            ++result[ value.response.headers[ index ].value ].count;
                          }

                          return result;
                        }, {} )
                        .reduce( function( result, value, key ) {
                          result.push( {
                            count : value.count,
                            index : index,
                            size  : value.size,
                            type  : key
                          } );

                          return result;
                        }, [] )
                        .value();

    return imageFiles;
  }

  var imageFiles1 = getImageFiles( har1, 1 );
  var imageFiles2 = getImageFiles( har2, 2 );

  var diff      = _.chain( imageFiles1.concat( imageFiles2 ) )
                    .groupBy( function( item ) {
                      return item.type;
                    } )
                    .reduce( function( result, item, key ) {
                      // determine if a new stylesheet was
                      // added or if one was removed
                      if ( item.length === 1 ) {
                        result.push( {
                          count : ( item[ 0 ].index === 0 ) ?
                                  item[ 0 ].count * -1 :
                                  item[ 0 ].count,
                          size  : ( item[ 0 ].index === 0 ) ?
                                  item[ 0 ].size * -1 :
                                  item[ 0 ].size,
                          type  : key
                        } );
                      }

                      // determine diff of the changes
                      if (
                        item.length === 2 &&
                        item[ 0 ].size !== item[ 1 ].size
                      ) {
                        result.push( {
                          count : item[ 1 ].count - item[ 0 ].count,
                          size  : item[ 1 ].size - item[ 0 ].size,
                          type  : key
                        } );
                      }

                      return result;
                    }, [] )
                    .value();

  return {
    description : 'Get compared JS bodySize values.',
    diff        : diff,
    values      : [
      _.map( imageFiles1, function( item ) {
        delete item.index;

        return item;
      } ),
      _.map( imageFiles2, function( item ) {
        delete item.index;

        return item;
      } )
    ]
  };
};
