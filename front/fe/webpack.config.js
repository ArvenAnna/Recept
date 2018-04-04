const webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        path: __dirname + '/bin',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/, /bin/],
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            exclude: [/node_modules/, /bin/],
            loader: "style-loader!css-loader!autoprefixer-loader"
        }, {
            test: /\.less$/,
            exclude: [/node_modules/, /bin/],
            loader: "style-loader!css-loader!autoprefixer-loader!less-loader!js-to-styles-var-loader"
        }, {
            test: /\.png$/,
            exclude: [/node_modules/, /bin/],
            loader: "url-loader?limit=1000000&mimetype=image/png"
        }, {
            test: /\.jsx$/,
            exclude: [/node_modules/, /bin/],
            loader: "babel-loader"
        }, {
            test: /\.tsx$/,
            exclude: [/node_modules/, /bin/],
            loader: "awesome-typescript-loader"
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

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: 'localhost', // Defaults to `localhost`
        port: 3004, // Defaults to 8080
        proxy: {
    //        '/api/*': {
            '/': {
                target: 'http://localhost:4003/',
                secure: false,
                changeOrigin: true
            }
        }
    },
};