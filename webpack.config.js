const path = require('path');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/www.ts',
  output:{
    filename: 'bundle.webpack.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  }
};