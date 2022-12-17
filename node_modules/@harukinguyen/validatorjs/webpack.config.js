const path = require('path');

module.exports = {
  entry: './main.js',
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    globalObject: 'this',
    library: {
      name: 'ValidatorJS',
      type: 'umd',
    },
  },
};
