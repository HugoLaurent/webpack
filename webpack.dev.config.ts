import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackConfig, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';

type Configuration = WebpackConfig & { devServer?: WebpackDevServerConfig };

const config: Configuration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.{ts|jsx}x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel@/preset.env','@babel/preset-typescript', '@babel/preset-react'],
                    },
                },
            }           
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, 'dist'),
        open: true,
        hot: true,
        port: 4000,
    },
};

export default config;