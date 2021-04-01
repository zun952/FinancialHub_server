import express from 'express';
import cors from 'cors';
import path from 'path';
import * as DBInstance from "./database/DBInstance";
import * as CoinGecko from "./CoinGecko";

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
            // DB 접속
            const conn = await DBInstance.default.getInstance()
                .catch((err) => console.log(`db connecting error - ${err}`));

            let dbVersion: string = 'disconnected';
            
            if(conn){
                dbVersion = conn.serverVersion()

                conn.end();
            }

            // Redis 접속

            

            res.send({
                serverVersion: dbVersion
            });
            
        });

        // 
        Express.app.get("/Acct", async (req: express.Request, res: express.Response) => {
            const conn = await DBInstance.default.getInstance()
                .catch((err) => console.log(`db connecting error - ${err}`));

            if(conn){
                

                conn.end();
            }

            res.json({
                id: "id",
                password: "password"
            });
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

            console.log(`[${currentTime}] ${req.method} ${req.ip}${req.url}`);

            res.json({
                "data": data
            })
        });
    }
}

export default Express;