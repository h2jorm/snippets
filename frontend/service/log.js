/**
 * log
 * @module service/log
 */

/**
 * print error logs
 * @param {Error} error - Error Object
 * @param {string} where - module name
 * see [jsdoc]{@link http://usejsdoc.org/about-namepaths.html}
 * * module#method(instance method)
 * * module~method(inner method)
 * * module.method(static method)
 */
export function logError(error, where) {
  // eslint-disable-next-line no-console
  console.error(`Error in ${where}: ${error.message}`);
}
