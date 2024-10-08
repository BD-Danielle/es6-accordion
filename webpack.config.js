const path = require('path');

module.exports = {
  mode: 'production', //development
  entry: './js/es6.accordion1.2.2.js',
  output: {
    path: path.resolve(__dirname, './js/webpack'),
    filename: 'es6.accordion.bundle1.2.2.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 使用正則表達式匹配需要轉換的文件
        exclude: /node_modules/, // 排除不需要轉換的文件
        use: {
          loader: 'babel-loader', // 使用 babel-loader 進行轉換
          options: {
            presets: ['@babel/preset-env'] // 使用 @babel/preset-env 進行轉換
          }
        }
      }
    ]
  }
}