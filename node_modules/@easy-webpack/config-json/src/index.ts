import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Json loader support for *.json files.
 * See: https://github.com/webpack/json-loader
 */
export = function json({exclude = null} = {}) {
  return function json(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      module: {
        rules: get(this, 'module.rules', []).concat([{
          test: /\.json$/i,
          loader: 'json-loader',
          exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
        }])
      }
    }
  }
}