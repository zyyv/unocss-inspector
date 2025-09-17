/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { Starter } from './index'

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Starter from 'unplugin-starter/rolldown'
 *
 * export default {
 *   plugins: [Starter()],
 * }
 * ```
 */
const rolldown = Starter.rolldown as typeof Starter.rolldown
export default rolldown
export { rolldown as 'module.exports' }
