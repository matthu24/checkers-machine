// webpack.config.js
var path = require('path');

module.exports = {
  entry: "./entry.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
   extensions: ['.js', '.jsx', '*']
 },
 module: {
      rules: [
    {
      test: [/\.js?$/],
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }
  ]
    }

};
