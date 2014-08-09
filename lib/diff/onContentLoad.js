
'use strict';

/**
 * Diff onContentLoad
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getOnContentLoad( har1, har2 ) {
  return {
    description : 'Get diff for onContentLoad event.',
    diff        : har1.log.pages[ 0 ].pageTimings.onContentLoad - har2.log.pages[ 0 ].pageTimings.onContentLoad,
    values      : [
      har1.log.pages[ 0 ].pageTimings.onContentLoad,
      har2.log.pages[ 0 ].pageTimings.onContentLoad
    ]
  };
};
