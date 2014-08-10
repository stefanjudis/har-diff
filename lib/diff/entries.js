
'use strict';

/**
 * Diff entries count
 *
 * @param  {Object} har1 har1
 * @param  {Object} har2 har2
 * @return {Object}      object containing values and diff
 */
module.exports = function getEntries( har1, har2 ) {
  return {
    description : 'Get diff for number of request entries.',
    diff        : har2.log.entries.length - har1.log.entries.length,
    values      : [
      har1.log.entries.length,
      har2.log.entries.length
    ]
  };
};
