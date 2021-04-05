import express from 'express';
import cors from 'cors';
import path from 'path';
import dbInstance from "./database/DbInstance";
import * as coinGecko from "./coinGecko";
import logger from "./winston";

class Express{
    private static app: express.Application;

    public static bootstrap = (): express.Application =>{
        if(!Express.app){
            Express.setApi();
        }

        return Express.app;
    }
    
    constructor(){
        Express.setApi();
    }

    // express setting
    private static setApi = (): void => {
        Express.app = express();

        Express.app.use(cors());
        Express.app.use(express.urlencoded({extended: false}));
        Express.app.use(express.json());
        Express.app.use(express.static(path.join(__dirname, 'public')));

        // 서버 접속 테스트
        Express.app.get("/", async (req: express.Request, res: express.Response) => {
            let dbVersion: string = 'disconnected';

            // DB 접속
            try{
                const conn = await dbInstance.getInstance();

                if(conn){
                    dbVersion = conn.serverVersion();
                    conn.end();
                }
            } catch(err){
                logger.error(err);
            }

            // Redis 접속
            
            res.send({
                serverVersion: dbVersion,
                redis: null
            });
        });

        // 
        Express.app.get("/Account/:id", async (req: express.Request, res: express.Response) => {
            let resData;

            try {
                const conn = await dbInstance.getInstance();

                if(conn){
                    conn.end();
                }

                resData = {
                    id: req.params['id']
                };
            } catch (err) {
                logger.error(`db connecting error - ${err}`);

                resData = {
                    err: err.message
                }
            }

            res.json(resData);
        });

        //
        Express.app.post("/Account", (req: express.Request, res: express.Response) => {
            const{
                body: { id, password }
            } = req;
            
            res.json({
                id: id,
                pw: password
            });
        });

        Express.app.get("/coins/:id", async (req: express.Request, res: express.Response) => {
            const coinId = req.params.id;
            const data = await coinGecko.default.getCurrentCoin(coinId);

            if(data["success"] == false){
                logger.warn(`${req.method} ${req.ip}${req.url} - fail`);
            } else{
                logger.info(`${req.method} ${req.ip}${req.url} - success`);
            }

            res.json({
                data: data
            })
        });

        //
        Express.app.get("/coins", async (req: express.Request, res: express.Response) => {
            const data = await coinGecko.default.markets();

            if(data["success"] == false){
                logger.warn(`${req.method} ${req.ip}${req.url} - fail`);
            } else{
                logger.info(`${req.method} ${req.ip}${req.url} - success`);
            }

            res.json({
                data: data
            })
        });
    }
}

export default Express;