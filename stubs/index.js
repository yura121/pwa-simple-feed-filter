const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const https = require('https');
const webpackConfig = require('../webpack.config.dev');

const app = express();
const compiler = webpack(webpackConfig);
const reqPath = path.join(__dirname, './');
const key = fs.readFileSync(path.resolve(reqPath, 'pwa-simple-feed-filter.test-key.pem'), 'utf-8');
const cert = fs.readFileSync(path.resolve(reqPath, 'pwa-simple-feed-filter.test.pem'), 'utf-8');

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: false,
        noInfo: true,
    }),
);

app.use(webpackHotMiddleware(compiler));

app.use('/css/:file', (request, response) => {
    response.sendFile(path.resolve(reqPath, `css/${request.params.file}`));
});

app.use('/font/:file', (request, response) => {
    response.sendFile(path.resolve(reqPath, `font/${request.params.file}`));
});

app.use('/data/:file', (request, response) => {
    response.sendFile(path.resolve(reqPath, `data/${request.params.file}`));
});

app.use('/', (request, response) => {
    let indexHtml = fs.readFileSync(path.resolve(reqPath, 'index.html'), 'utf-8');
    indexHtml = indexHtml.replace("'unsafe-inline'", "'unsafe-eval'");
    response.send(indexHtml);
});

// const port = 3030;
// app.listen(port, () => console.log(`Available on: http://localhost:${port}\n`));
const port = 3031;
https.createServer({ key, cert }, app)
    .listen(port, () => console.log(`Available on: https://localhost:${port}\n`));

module.exports = app;
