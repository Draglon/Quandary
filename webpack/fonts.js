module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /.(eot|ttf|woff|woff2|svg)(\?.+)?$/,
          exclude: /images/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 10000,
                name: './fonts/[name].[ext]',
              }
            }
          ]
        }
      ]
    }
  };
};