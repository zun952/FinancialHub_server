// import express from './Express';
const express = require('./Express');
const logger = require("./winston");

const port: number = Number(process.env.PORT) || 3000;
const app = express.default.bootstrap();

app.listen(port, () => console.log(`Express server listening at ${port}`))
    .on('error', (err: any) => logger.error(err));