const webpack = require('webpack');

module.exports = {
	entry: "./public/script.js",
	output: {
		filename: "public/bundle.js"
	},
	module: {
		loaders: [
		{
			exclude: /(node_modules|server.js)/,
			loader: 'babel-loader'
		}]
	},
	plugins: [new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(process.env.environment)
		}
	})]
};