const express = require('express');
const app = express();
var proxy = require('http-proxy-middleware');


// proxy middleware options
var options = {
    target: 'http://0.0.0.0:8080', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    // ws: true,                         // proxy websockets
    pathRewrite: {
        '^/api' : '/',
        // '^/api/old-path' : '/api/new-path',     // rewrite path
        // '^/api/remove/path' : '/path'           // remove base path
    },
    // router: {
    //     // when request.headers.host == 'dev.localhost:3000',
    //     // override target 'http://www.example.org' to 'http://localhost:8000'
    //     'dev.localhost:4003' : 'http://localhost:8000'
    // }
};

// create the proxy (without context)
var exampleProxy = proxy(options);

app.use('/api', exampleProxy);

app.set('port', 4003);

app.listen(app.get('port'), function() {
    console.log('Node App Started');
});