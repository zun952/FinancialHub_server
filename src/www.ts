// import express from 'express';
// import logger from './winston';
const express = require("express");
const logger = require("./winston");

async function startServer() {
    const port: number = Number(process.env.PORT) || 3000;
    const app = express();

    await require('./loaders').default({ expressApp: app });
    
    app.listen(port, () => { console.log(`Express server listening at ${port}`) })
        .on('error', (err: any) => logger.error(err));
}

startServer();