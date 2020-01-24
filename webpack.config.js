const path = require('path');

module.exports = {
  mode: 'development',
  entry: 'app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  devServer: {
    proxy: {
      "*": "http://[::1]:8081"
      "secure": false,
    "changeOrigin": true
    }
  }
};