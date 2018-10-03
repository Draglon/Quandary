const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const scss = require('./webpack/scss');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
  source: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/index.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name]_01.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/templates/pages/main.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'profile.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/templates/pages/profile.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'experience.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/templates/pages/experience.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'about.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/templates/pages/about.pug'
            }),
            
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    pug(),
    fonts(),
    images()
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      uglifyJS()
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      scss(),
      css()
    ]);
  }
};