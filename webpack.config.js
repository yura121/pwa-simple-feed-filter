const WebpackCopy = require('copy-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const outputDirectory = 'dist';
const version = process.env.npm_package_version || 0;

module.exports = {
    mode: 'production',
    entry: [
        '@src/index.js',
    ],
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/',
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
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new WebpackCopy([
            { from: 'stubs/index.html' },
            { from: 'stubs/favicon.ico' },
            { from: 'stubs/robots.txt' },
            { from: 'stubs/manifest.json' },
            {
                from: 'node_modules/vue/dist/vue.min.js',
                to: 'js/vue.min.js',
            },
            {
                from: 'node_modules/vuetify/dist/vuetify.min.js',
                to: 'js/vuetify.min.js',
            },
            {
                from: 'stubs/css/',
                to: 'css/[name].[ext]',
            },
            {
                from: 'stubs/font/',
                to: 'font/[name].[ext]',
            },
            {
                from: 'stubs/img/icons',
                to: 'img/icons/[name].[ext]',
            },
        ]),
        new HtmlWebpackPlugin({
            inject: false,
            minify: false,
            template: 'stubs/index.html',
            templateParameters: {
                isPWA: true,
            },
        }),
        new WorkboxPlugin.GenerateSW({
            mode: 'development',
            clientsClaim: true,
            skipWaiting: false,
            navigateFallback: '/index.html',
            directoryIndex: '/index.html',
            exclude: [
                /^\..*$/,
                /^.*\.php$/,
                'robots.txt',
            ],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                APP_VERSION: `"${version}"`,
            },
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
};
