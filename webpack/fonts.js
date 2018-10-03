module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /.(eot|ttf|woff|woff2)(\?.+)?$/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: './fonts/[name].[ext]',
          }
        }
      ]
    }
  };
};