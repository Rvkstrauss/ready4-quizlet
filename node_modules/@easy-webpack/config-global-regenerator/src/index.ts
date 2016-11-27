import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as webpack from 'webpack'

export = function regenerator() {
  return function regenerator(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      plugins: [
        new webpack.ProvidePlugin({
          'regeneratorRuntime': 'regenerator-runtime', // required for await-async
        })
      ].concat(get(this, 'plugins', []))
    }
  }
}