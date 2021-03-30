import express = require('express');
import cors from 'cors';
import path from 'path';
import * as DBInstance from "./database/DBInstance";

const CoinGecko = require('coingecko-api');

class App{
    public app: express.Application;


    public static Bootstrap(): App{
        return new App();
    }
    
    constructor(){
        this.app = express();
        const CoinGeckoClient = new CoinGecko();

        this.app.use(cors());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.get("/", async (req: express.Request, res: express.Response) => {
            const conn = await DBInstance.default.getInstance()
                .catch((err) => console.log(`db connecting error - ${err}`));

            let dbVersion: string = '';

            if(conn){
                dbVersion = conn.serverVersion()
            }

            res.send({
                serverVersion: dbVersion
            });
            
        });

        this.app.get("/Acct", async (req: express.Request, res: express.Response) => {
            const conn = await DBInstance.default.getInstance()
                .catch((err) => console.log(`db connecting error - ${err}`));

            if(conn){
                
            }

            res.json({
                id: "id",
                password: "password"
            });
        });

        this.app.post("/Acct", (req: express.Request, res: express.Response) => {
            const{
                body: { id, password }
            } = req;
            
            res.json({
                id: id,
                pw: password
            });
        });

        this.app.get("/AllCoin", async (req: express.Request, res: express.Response) => {
            let data = await Get();

            res.json({
                "data": data
            })
        });

        let Get = async(): Promise<any> => {
            
            return await CoinGeckoClient.coins.markets({
                vs_currency: 'krw'
            });
        }
    }
}

export default App;