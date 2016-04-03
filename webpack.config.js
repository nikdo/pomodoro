var webpack = require('webpack');

module.exports = {
	entry: "./src/entry.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader'
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		})
	]
}
