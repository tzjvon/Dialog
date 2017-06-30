
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const PORT = 8080;

module.exports = {
	entry: {
		Dialog: './build/Dialog.js',
	},
	output: {
		path			: path.resolve(__dirname,'dist'),
		library 		: '[name]',
		filename		: '[name].js',
		libraryTarget	: 'umd'
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 0 versions!sass-loader'
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					minimize: true
				}
			},
			{ test: /\.jpg$/, loader: "file-loader" },
      		{ test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      		{ test: /\.gif$/, loader: "url-loader" }
		]
	},

	devServer: {
		port: PORT
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './examples/index.html'
		}),
		new OpenBrowserWebpackPlugin({
			url: 'http://127.0.0.1:'+PORT
		})
	]
}
