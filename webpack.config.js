/* eslint-disable no-undef */
const path = require('path');

module.exports = {
    entry: './src/save_dxf.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};