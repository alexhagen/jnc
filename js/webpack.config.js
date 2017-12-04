var path = require('path');
var version = require('./package.json').version;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules_index = [
    { test: /\.css/, loader: ExtractTextPlugin.extract("css-loader?modules&importLoaders=1&localIdentName=[name]__[local]")},
    { test: /\.js/, loader: 'babel-loader', include: __dirname + '/lib'},
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
]

var loaders_index =  [
    { test: /\.css/, loader: ExtractTextPlugin.extract("css-loader?modules&importLoaders=1&localIdentName=[name]__[local]")},
    { test: /\.js/, loader: 'babel-loader', include: __dirname + '/lib'},
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
]



module.exports = [
    {// Notebook extension
     //
     // This bundle only contains the part of the JavaScript that is run on
     // load of the notebook. This section generally only performs
     // some configuration for requirejs, and provides the legacy
     // "load_ipython_extension" function which is required for any notebook
     // extension.
     //
        entry: './lib/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'jnc', 'static'),
            libraryTarget: 'amd'
        }
    },
    {// Bundle for the notebook containing the custom widget views and models
     //
     // This bundle contains the implementation for the custom widget views and
     // custom widget.
     // It must be an amd module
     //
        entry: './lib/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'jnc', 'static'),
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            rules: rules_index,
            loaders: loaders_index
        },
        plugins: [
          new ExtractTextPlugin("styles.css")
        ],
        externals: ['@jupyter-widgets/base']
    },
    {// Embeddable jnc bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by unpkg to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './lib/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/jnc@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules_index,
            loaders: loaders_index
        },
        plugins: [
          new ExtractTextPlugin("styles.css")
        ],
        externals: ['@jupyter-widgets/base']
    }
];
