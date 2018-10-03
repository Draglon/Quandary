module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          include: paths,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        }
      ]
    }
  }
};