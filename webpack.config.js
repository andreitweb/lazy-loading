const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: [
        './src/index.js',
    ],

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		new CopyWebpackPlugin([
			{
				from: './src/image',
				to: './image'
			},
		]),
	],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "sass-loader",
					}
				]
			},
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};
