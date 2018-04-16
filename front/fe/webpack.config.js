//const webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        path: __dirname + '/bin',
        filename: 'app.bundle.js'
    },
	mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/, /bin/],
            use: 'babel-loader',
        }, {
            test: /\.css$/,
            exclude: [/node_modules/, /bin/],
            use: [{loader: "style-loader"},
                {loader: "css-loader"},
                {loader: "postcss-loader"}]
        }, {
            test: /\.less$/,
            exclude: [/node_modules/, /bin/],
			use: [{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "postcss-loader"},
                {loader: "less-loader"},
                {loader: "js-to-styles-var-loader"}]
        }, {
            test: /\.png$/,
            exclude: [/node_modules/, /bin/],
            use: [{loader: "url-loader",
                options: {
                    "limit": 1000000,
                    "mimetype": "image/png"
                }}]
        }, {
            test: /\.jsx$/,
            exclude: [/node_modules/, /bin/],
            use: "babel-loader"
        }, {
            test: /\.tsx$/,
            exclude: [/node_modules/, /bin/],
            use: "awesome-typescript-loader"
        }, {
            test: /\.svg$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    loader: 'react-svg-loader',
                    // options: {
                    //     svgo: {
                    //         plugins: [{removeTitle: false}],
                    //         floatPrecision: 2
                    //     }
                    // }
                }
            ]
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    devtool: "source-map",
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 100
    // }

    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     host: 'localhost', // Defaults to `localhost`
    //     port: 3004, // Defaults to 8080
    //     proxy: {
    // //        '/api/*': {
    //         '/': {
    //             target: `http://localhost:4003`,
    //             secure: false,
    //             changeOrigin: true
    //         }
    //     }
    // },
};