module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'babel'
    }]
  },
  output: {
    libraryTarget: 'umd',
    library: 'angular-schema'
  },
  resolve: {
    extensions: [
      '',
      '.es6',
      '.js'
    ]
  }
};
