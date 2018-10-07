module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(gif|jpg|webp|png|svg)$/,
          exclude: /fonts/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './images/[name].[ext]'
              }
            }
          ]
        }
      ]
    }
  };
};