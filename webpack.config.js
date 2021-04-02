const path = require('path');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/www.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: NODE_ENV,
  target: 'node',
  resolve: {
    extensions: ['.ts, .tsx, .js']
  },
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};