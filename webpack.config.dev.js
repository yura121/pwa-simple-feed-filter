const WebpackCopy = require('copy-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const outputDirectory = 'dist';
const version = process.env.npm_package_version || 0;

module.exports = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        '@src/index.js',
    ],
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/',
        hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: '.hot/[hash].hot-update.json',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.vue?$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackCopy([
            { from: 'stubs/favicon.ico' },
            {
                from: 'node_modules/vue/dist/vue.min.js',
                to: 'js/vue.min.js',
            },
            {
                from: 'node_modules/vuetify/dist/vuetify.min.js',
                to: 'js/vuetify.min.js',
            },
        ]),
        new HtmlWebpackPlugin({
            inject: false,
            minify: false,
            template: 'stubs/index.html',
            templateParameters: {
                isPWA: false,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                APP_VERSION: `"${version}"`,
            },
        }),
        new Dotenv({
            path: './.env.dev',
        }),
    ],
    externals: {
        vue: 'Vue',
        vuetify: 'Vuetify',
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.vue'],
    },
    devtool: 'inline-source-map',
};
