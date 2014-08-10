
'use strict';

/**
 * Diff onLoad
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getOnLoad( har1, har2 ) {
  return {
    description : 'Get diff for onLoad event.',
    diff        : har2.log.pages[ 0 ].pageTimings.onLoad - har1.log.pages[ 0 ].pageTimings.onLoad,
    values      : [
      har1.log.pages[ 0 ].pageTimings.onLoad,
      har2.log.pages[ 0 ].pageTimings.onLoad
    ]
  };
};
