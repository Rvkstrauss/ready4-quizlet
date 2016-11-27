import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as webpack from 'webpack'

/**
 * Plugin: CommonsChunkPlugin
 * Description: Shares common code between the pages.
 * It identifies common modules and put them into a commons chunk.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
 */
export = function commonChunksSimple({appChunkName = '', firstChunk = ''} = {}) {
  return function commonChunksSimple(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: [
            firstChunk,
            ...Object.keys(this.entry || {}).filter(entry => entry !== appChunkName && entry !== firstChunk)
          ].reverse()
        }),
      ].concat(get(this, 'plugins', []))
    }
  }
}