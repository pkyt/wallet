const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" },
      { from: './app/client_sig.html', to: "client_sig.html"},
      { from: './app/javascripts/client_sig.js', to: "javascripts/client_sig.js"},
      { from: './app/javascripts/geth_sig.js', to: "javascripts/geth_sig.js"},
      { from: './app/javascripts/_vendor/hooked-web3-provider.js', 
        to: "javascripts/_vendor/hooked-web3-provider.js"},
      { from: './app/javascripts/_vendor/lightwallet.js', 
        to: "javascripts/_vendor/lightwallet.js"}
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
