import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'

/**
 * @param exclude add paths to packages that have problems with their sourcemaps
 */
export = function externalSourceMaps({exclude = []} = {}) {
  return function externalSourceMaps(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      module: {
        rules: get(this, 'module.rules', []).concat([{
          test: /\.jsx?$/,
          loader: 'source-map-loader',
          enforce: 'pre', 
          exclude
        }])
      }
    }
  }
}