/* eslint-disable */

var path = require('path');

module.exports = {
  mode: 'development',
  entry: './source/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'istracoffee.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["env", "react", "stage-2"]
            }
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};