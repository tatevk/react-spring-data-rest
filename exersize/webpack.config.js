var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
     watchOptions: {
    poll: true
            },
    cache: false,
    debug: false,
    output: {
           path: path.join(__dirname, './target/classes/static/built/'),
                filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};