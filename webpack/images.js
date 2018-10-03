module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(gif|jpg|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]'
          }
        }
      ]
    }
  };
};