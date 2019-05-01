const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

function resolve (dir) {
	return path.join(__dirname, dir)
}

module.exports = env => {

    console.dir(env);
    console.dir(__dirname);

    return {
        entry: './src/app.js',
        output: {
            path: __dirname + '/bin',
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            publicPath: '/bin/'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/, /bin/],
                    use: 'babel-loader'
                },
				{
					test: /\.svg$/,
					use: [{ loader: 'html-loader' }]
				},
				{
					test: /\.(js|vue)$/,
					use: 'eslint-loader',
					enforce: 'pre'
				},
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [{loader: "vue-style-loader"},
                        {loader: "style-loader"},
                        {loader: "css-loader"},
                        {loader: "postcss-loader"}]
                },
                {
                    test: /\.less$/,
                    exclude: [/node_modules/, /bin/],
                    use: [{loader: "vue-style-loader"}, {loader: "style-loader"},
                        {loader: "css-loader"},
                        {loader: "postcss-loader"},
                        {loader: "less-loader"},
                        {loader: "js-to-styles-var-loader"}]
                }, {
                    test: /\.png$/,
                    exclude: [/node_modules/, /bin/],
                    use: [{
                        loader: "url-loader",
                        options: {
                            "limit": 1000000,
                            "mimetype": "image/png"
                        }}]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'FOTO_CATALOG': JSON.stringify(env.FOTO_CATALOG),
                    'TEMP_CATALOG': JSON.stringify(env.TEMP_CATALOG)
                }
            }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true
            }),
			new CopyWebpackPlugin([{
				from: resolve('src/assets/'),
				to: resolve('bin/assets/'),
				toType: 'dir'
			}])
        ],

        // resolve: {
        //     extensions: ['.js']
        // },

        devtool: "source-map",
    }
}
