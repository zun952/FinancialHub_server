import express from 'express';
import cors from 'cors';
import path from 'path';
import { DBInstance } from "./database/DBInstance";
import * as CoinGecko from "./CoinGecko";
import { logger } from "./winston";
import { PoolConnection } from 'mariadb';

class Express{
    private static app: express.Application;

    public static Bootstrap = (): express.Application =>{
        if(!Express.app){
            Express.SetApi();
        }

        return Express.app;
    }
    
    constructor(){
        Express.SetApi();
    }

    private static SetApi = (): void => {
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
                const conn = await DBInstance.getInstance();

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
        Express.app.get("/Acct", async (req: express.Request, res: express.Response) => {
            let resData;

            try {
                const conn = await DBInstance.getInstance();

                if(conn){
                    conn.end();
                }

                resData = {
                    id: 'id'
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
        Express.app.post("/Acct", (req: express.Request, res: express.Response) => {
            const{
                body: { id, password }
            } = req;
            
            res.json({
                id: id,
                pw: password
            });
        });

        //
        Express.app.get("/AllCoin", async (req: express.Request, res: express.Response) => {
            let data = await CoinGecko.default.markets();

            const currentTime = new Date().toLocaleString();

            logger.info(`[${currentTime}] ${req.method} ${req.ip}${req.url}`);

            res.json({
                data: data
            })
        });
    }
}

export default Express;