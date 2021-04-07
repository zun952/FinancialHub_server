import cors from 'cors';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from "http-errors";
import logger from "../winston";
import routes from "../api";
import config from "../config";

export default ({ app }: { app: express.Application }) => {
    app.get('/status', (req: express.Request, res: Response) => { res.status(200).end(); });
    app.head('/status', (req: express.Request, res: Response) => { res.status(200).end(); });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    // app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternated description: 
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // 접속 로그용
    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(`${req.method} ${req.ip}${req.url}`);

        next();
    });

    // load API routes
    app.use(config.api.prefix, routes);

    console.log(app._router.stack.filter((r: { route: any; })  => r.route)
                .map((r: { route: { methods: {}; path: any; }; }) => {
                    return {
                        method: Object.keys(r.route.methods)[0].toUpperCase(),
                        path: r.route.path
                    };
                })
    );
    
    // DB 접속 테스트
    // app.get("/dbs", async (req: express.Request, res: express.Response) => {
    //     let dbVersion: string = 'disconnected';

    //     // DB 접속
    //     try{
    //         const conn = await dbInstance.getInstance();

    //         if(conn){
    //             dbVersion = conn.serverVersion();
    //             conn.end();
    //         }
    //     } catch(err){
    //         logger.error(err);
    //     }

    //     // Redis 접속
        
    //     res.send({
    //         serverVersion: dbVersion,
    //         redis: null
    //     });
    // });

    app.use((req: Request, res: Response, next: NextFunction) => {
        const err = new Error('Not Found') as any;

        err.status = 404;

        next(err);
    });

    app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        if(err.name === 'UnauthorizedError'){
            return res.status(err.status).send({ message: err.message }).end();
        }

        return next(err);
    });

    app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500)

        res.json({
            'errors': {
                message: err.message
            }
        });
    });
}