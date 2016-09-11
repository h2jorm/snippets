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
  if (obj === null)
    return null;
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj).reduce((ret, attr) => Object.assign(ret, {
      [camelcase(attr)]: camelize(obj[attr])
    }), {});
  }
  return obj;
}

/**
 * camelcase -> snakecase
 * @param {Object} obj
 * @return {Object} obj - a new snakecase object
 */
export function snakelize(obj) {
  if (obj === null)
    return null;
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj).reduce((ret, attr) => Object.assign(ret, {
      [snakecase(attr)]: snakelize(obj[attr])
    }), {});
  }
  return obj;
}
