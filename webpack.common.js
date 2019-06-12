const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

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
        entry: './index.scss',
        output: {
            // This is necessary for webpack to compile, but we never reference this js file.
            filename: 'style-bundle-index.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /index.scss$/,
                use: getStyleUse('bundle-index.css')
            }]
        },
    },
    {
        entry: "./index.js",
        plugins: [
            // new CleanWebpackPlugin()
        ],
        output: {
            filename: "bundle-index.js",
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            loaders: [{
                test: /index.js$/,
                loader: 'babel-loader',
                query: { presets: ['env'] }
            }]
        },
    }
];
