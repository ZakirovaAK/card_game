const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
	entry: './js/script.js',
	mode,
	module: {
		rules: [
			{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }, // 'style-loader'
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'static', to: 'static', noErrorOnMissing: true }],
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new MiniCssExtractPlugin({}),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin()],
	},
	devtool:
		process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'source-map',
};
