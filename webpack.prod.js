const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

function getStyleUse(bundleFilename) {
    return [
        {
            loader: 'file-loader',
            options: {
                name: bundleFilename,
            },
        },
        { loader: 'extract-loader' },
        { loader: 'css-loader' },
        {
            loader: 'sass-loader',
            options: {
                includePaths: ['./node_modules'],
                implementation: require('dart-sass'),
                fiber: require('fibers'),
            }
        },
    ];
}

module.exports = [
    {
        entry: ['./index.js', './index.scss'],
        output: {
            filename: "bundle-index.js",
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /index.scss$/,
                use: getStyleUse('bundle-index.css')
            }],
            loaders: [{
                test: /index.js$/,
                loader: 'babel-loader',
                query: { presets: ['env'] }
            }]
        },
        plugins: [
            new UglifyJSPlugin()
        ]
    }
]