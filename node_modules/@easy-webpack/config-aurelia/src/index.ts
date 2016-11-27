import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
const AureliaWebpackPlugin = require('aurelia-webpack-plugin')

export = function aurelia(allOptions = {root: '', src: '', title: 'Aurelia', baseUrl: '/'} as any) {
  if (!allOptions.customViewLoaders) {
    // temporary fix until released: https://github.com/aurelia/webpack-plugin/commit/472558fc33862832b4192896434946fd935e429e
    allOptions.customViewLoaders = {
      '.css': ['css-loader'],
      '.scss': ['css-loader', 'sass-loader'],
      '.sass': ['css-loader', 'sass-loader'],
      '.less': ['css-loader', 'less-loader'],
      '.styl': ['css-loader', 'stylus-loader'],
    }
  }
  const {title, baseUrl, root, src} = allOptions
  return function aurelia(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    return {
      metadata: {
        title,
        baseUrl,
        root,
        src,
      },
      resolve: {
        modules: [src].concat(get(this, 'resolve.modules', ['node_modules']))
      },
      plugins: [
        new AureliaWebpackPlugin(allOptions)
      ].concat(get(this, 'plugins', []))
    }
  }
}
