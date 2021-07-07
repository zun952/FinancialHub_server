import cors from 'cors';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from "http-errors";
import morgan from "morgan";
import { logger, stream } from "../winston";
import routes from "../api";
import config from "../config";

export default ({ app }: { app: express.Application }) => {
    morgan.format('logFormat', ':remote-addr :method :url status: :status length: res[content-length] res-time: :response-time ms');
    app.use(morgan('logFormat', { stream }))

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternated description: 
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/status', (req: express.Request, res: Response) => { res.status(200).end(); });
    app.head('/status', (req: express.Request, res: Response) => { res.status(200).end(); });

    // load API routes
    app.use(config.api.prefix, routes);

    console.log(app._router.stack.filter((r: { route: any; })  => r.route)
        .map((r: { route: { methods: {}; path: any; }; }) => {
        return {
            method: Object.keys(r.route.methods)[0].toUpperCase(),
            path: r.route.path
        };
    }));
    
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