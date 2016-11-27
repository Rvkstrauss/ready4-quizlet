import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'

export = function fontsAndImages() {
  return function fontsAndImages(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      module: {
        rules: get(this, 'module.rules', []).concat([
          // embed small images and fonts as Data Urls and larger ones as files
          { test: /\.(png|gif|jpg)$/, loader: 'url-loader', query: { limit: 8192 } },
          { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2' } },
          { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
          { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
        ])
      }
    }
  }
}
