import express from 'express';
import { logger } from '../winston';
import loader from "../loaders";

async function startServer() {
    const port: number = Number(process.env.PORT) || 3000;
    const app: express.Application = express();

<<<<<<< HEAD
    // await require('../loaders').default({ expressApp: app });
    (await import('../loaders')).default({ expressApp: app });
    
=======
    await loader({ expressApp: app });
>>>>>>> 12564d8aa61985bd5837a19994d5514b70665df9
    
    try{
        app.listen(port, () => logger.info(`Express server listening at ${port}`))
            .on('error', (err: unknown) => logger.error(err));
    } catch(err: unknown){
        logger.error(err);
    }
}

startServer();