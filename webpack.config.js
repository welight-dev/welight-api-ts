var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: './lib/welight.js',
   output: {
       path: path.resolve(__dirname, 'build'),
       filename: 'main.bundle.js'
   },
   module: {
     rules: [
       {
         test: /\.(ts|tsx)$/,
         loader: 'babel-loader',
       },
     ]
   },
   resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']},
   stats: {
       colors: true
   },
   devtool: 'source-map'
};
