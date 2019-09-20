const webpack = require('webpack');

module.exports = env => {

    return {
        entry: './web-components/app.js',
        output: {
            path: __dirname + '/bin',
            filename: 'app.bundle.js'
        },
        mode: 'development',
        module: {
            rules: []
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'FOTO_CATALOG': JSON.stringify(env.FOTO_CATALOG),
                    'TEMP_CATALOG': JSON.stringify(env.TEMP_CATALOG),
                    'PREVIEW_IMAGE_PREFIX': JSON.stringify(env.PREVIEW_IMG_PREFIX)
                }
            })
        ],

        resolve: {
            extensions: ['.js']
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
    }
}
