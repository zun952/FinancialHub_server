import express from 'express';
import { logger } from '../winston';
import loader from "../loaders";

async function startServer() {
    const port: number = Number(process.env.PORT) || 3000;
    const app: express.Application = express();

    (await import('../loaders')).default({ expressApp: app });
    
    try{
        app.listen(port, () => logger.info(`Express server listening at ${port}`))
            .on('error', (err: unknown) => logger.error(err));
    } catch(err: unknown){
        logger.error(err);
    }
}

startServer();