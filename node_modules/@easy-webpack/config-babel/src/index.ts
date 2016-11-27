import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Babel loader support
 * See: https://github.com/babel/babel-loader
 */
export = function babel({ options = {
    "plugins": [
      "transform-decorators-legacy",
      "transform-class-properties"
    ],
    "presets": [
      [
        "env",
        {
          "targets": {
            "browsers": [
              "last 2 versions",
              "not ie <= 11"
            ]
          },
          "loose": true,
          "modules": false
        }
      ]
    ],
    cacheDirectory: true,
  }, exclude = null } = {}) {
  return function babel(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      module: {
        rules: get(this, 'module.rules', []).concat([{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
          query: options
        }])
      }
    }
  }
}