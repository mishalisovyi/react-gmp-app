const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.config.common');

module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },

  plugins: [
    new MiniCssExtractPlugin(),
  ],
});
