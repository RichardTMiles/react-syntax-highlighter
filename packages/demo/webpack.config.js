const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname),
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    publicPath: '/demo/build/',
    port: '9001',
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  entry: {
    demo: './src/index.js',
    prism: './src/prism.js',
    diff: './src/diff.js',
    virtualized: './src/virtualized.js',
    prismAsyncLight: './src/prism-async-light.js'
  },
  output: {
    path: path.resolve(__dirname, 'src/build'),
    publicPath: 'build/',
    filename: '[name]-build.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      { test: /\.css$/,  use: [
          'style-loader',
          'css-loader'
        ] },
      // TypeScript loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
