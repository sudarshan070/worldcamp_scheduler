import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './app/App';

function handleRender(req, res) {
    // Renders our Hello component into an HTML string
    const html = ReactDOMServer.renderToString(<App />);

    // Load contents of index.html
    fs.readFile('./app/index.html', 'utf8', function (err, data) {
        if (err) throw err;

        // Inserts the rendered React HTML into our main div
        const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

        // Sends the response back to the client
        res.send(document);
    });
}

const app = express();

// Serve built files with static files middleware
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000); 
