import camelcase from 'lodash.camelcase';
import snakecase from 'lodash.snakecase';

/**
 * transform between snakecase and camelcase
 * @module service/adapter
 */

/**
 * snakecase -> camelcase
 * @param {Object} obj
 * @return {Object} obj - a new camelcase object
 */
export function camelize(obj) {
  if (obj === null) {
    return null;
  }
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const ret = {};
    Object.keys(obj).forEach((attr) => {
      ret[camelcase(attr)] = camelize(obj[attr]);
    });
    return ret;
  }
  return Array.isArray(obj) ? obj.map(o => camelize(o)) : obj;
}


/**
 * camelcase -> snakecase
 * @param {Object} obj
 * @return {Object} obj - a new snakecase object
 */
export function snakelize(obj) {
  if (obj === null) {
    return null;
  }
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const ret = {};
    Object.keys(obj).forEach((attr) => {
      ret[snakecase(attr)] = snakelize(obj[attr]);
    });
    return ret;
  }
  return Array.isArray(obj) ? obj.map(o => snakelize(o)) : obj;
}
