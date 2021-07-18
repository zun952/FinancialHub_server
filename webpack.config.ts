const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/bin/www.ts',
  output: {
    filename: 'bundle.webpack.ts',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  resolve: {
    extensions: ['.js, .ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/, 
        use: 'ts-loader',
        include: [
          path.join(__dirname)
        ],
        exclude: [
          /node_modules/
        ]
      }
    ]
  },
  optimization: {
    minimize: false
  },
  devtool: 'source-map',
  mode: NODE_ENV,
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
  }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './package.json', to: './'}
      ]
    })
  ]
}