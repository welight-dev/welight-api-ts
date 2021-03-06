var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: './lib/welight.ts',
   output: {
       path: path.resolve(__dirname, 'build'),
       filename: 'welight.min.js',
       library: 'welight',
       libraryTarget: 'var'
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
   devtool: 'null'
   //devtool: 'source-map'
};
