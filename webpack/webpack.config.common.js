const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve('./src');

module.exports = {
  entry: path.resolve(srcPath, './index.tsx'),

  module: {
    rules: [{
      test: /\.(tsx|ts|jsx|js)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },

  output: {
    path: path.resolve('./dist'),
  },

  performance: {
    maxAssetSize: 500_000,
    maxEntrypointSize: 500_000,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, './index.html'),
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: ['./node_modules', srcPath],
  },
};
