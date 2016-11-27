import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Instruments JS files with Istanbul for subsequent code coverage reporting.
 * Instrument only testing sources.
 *
 * See: https://github.com/deepsweet/istanbul-instrumenter-loader
 */
// NOTE: Currently breaks with Webpack >=2
export = function istanbul({include = undefined, exclude = undefined, options = { 'force-sourcemap': true }}:{include?, exclude?, options?} = {}) {
  return function istanbul(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      module: {
        rules: get(this, 'module.rules', []).concat([{
          test: /\.(js|ts)$/,
          loader: 'sourcemap-istanbul-instrumenter-loader',
          query: options,
          enforce: 'post',
          include: include || this.metadata.src,
          exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
        }])
      }
    }
  }
}