import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as webpack from 'webpack'

/**
 * Plugin: UglifyJsPlugin
 * Description: Minimize all JavaScript output of chunks.
 * Loaders are switched into minimizing mode.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
 */
export = function uglify({debug = false, exclude = [], mangle = {screw_ie8 : true, keep_fnames: true} as any} = {}) {
  return function uglify(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    const options = debug ? {
      beautify: true, //debug
      mangle: false, //debug
      dead_code: false, //debug
      unused: false, //debug
      deadCode: false, //debug
      compress: {
        screw_ie8: true,
        keep_fnames: true,
        drop_debugger: false,
        dead_code: false,
        unused: false
      }, // debug
      comments: true, //debug
    } : {
      beautify: false, //prod

      mangle: mangle, //prod

      exclude: exclude,

      compress: {
        screw_ie8: true,
        warnings: false
      }, //prod

      comments: false //prod
    }

    return {
      plugins: get(this, 'plugins', []).concat([
        // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
        new webpack.optimize.UglifyJsPlugin(options),
      ])
    }
  }
}