import pinterpolate from 'pinterpolate';

/**
 *
 * @param {String} str
 * @param {Object} params
 * @returns {String}
 * example interpolate('product/:id',{id:2})
 * => 'product/2'
 */
export const interpolate = (str, params) => pinterpolate(str, params);
