// import express from './Express';
// const express = require('./loaders/Express');
import express from 'express';
import app from './api';
import config from './config';
const logger = require("./winston");

async function startServer() {
    const port: number = Number(process.env.PORT) || 3000;
    const app = express();

    await require('./loaders').default({ expressApp: app });
    
    app.listen(port, () => { console.log(`Express server listening at ${port}`) })
        .on('error', (err: any) => logger.error(err));

    console.log(app._router.stack.filter((r: { route: any; })  => r.route)
                .map((r: { route: { methods: {}; path: any; }; }) => {
                    return {
                        method: Object.keys(r.route.methods)[0].toUpperCase(),
                        path: r.route.path
                    };
                })
    );
}



startServer();