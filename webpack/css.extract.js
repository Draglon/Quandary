const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: ['css-loader','group-css-media-queries-loader','sass-loader']
          })
        },
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('./css/[name]_01.css'),
      new CssoWebpackPlugin({ pluginOutputPostfix: 'min' })
    ]

  };
};