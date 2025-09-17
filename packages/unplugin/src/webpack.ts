/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { Starter } from './index'

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import Starter from 'unplugin-starter/webpack'
 *
 * export default {
 *   plugins: [Starter()],
 * }
 * ```
 */
const webpack = Starter.webpack as typeof Starter.webpack
export default webpack
export { webpack as 'module.exports' }
