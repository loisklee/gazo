var dotenv = require('dotenv').config({path: __dirname + '/.env'});
const Dotenv = require('dotenv-webpack');


const path = require('path');
const webpack = require('webpack');


process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.CVA_PORT = process.env.CVA_PORT || 9000

const config = function (mode) {
    let conf = {
        mode: mode,
        entry: ['./src/index.js'],
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'html-loader',
                    options: {}
                }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
        ]
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public/')
        },
        plugins: [
            new Dotenv(),
            new webpack.DefinePlugin({
                "process.env": dotenv.parsed
            })
        ],
        devtool: 'source-map',
        devServer: {
            watchOptions: {
                ignored: /node_modules/
            },
            contentBase: 'public',
            compress: true,
            port: process.env.CVA_PORT,
            watchContentBase: true
        }
    }

    if (mode === 'development') {
        conf.plugins.push(new webpack.HotModuleReplacementPlugin())
        conf.plugins.push(new webpack.NoEmitOnErrorsPlugin())
    }

    return conf
}

module.exports = config(process.env.NODE_ENV)