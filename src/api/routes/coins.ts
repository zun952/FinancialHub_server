import { Router, Request, Response } from "express";
import * as coinGecko from "../../coinGecko";
import logger from "../../winston";

const route = Router();

export default (app: Router) => {
    app.use('/coins', route);

    // 전체 코인 정보
    route.get("/", async (req: Request, res: Response) => {
        const data = await coinGecko.default.markets();

        // if(data["success"] == false){
        //     logger.warn(`${req.method} ${req.ip}${req.url} - fail`);
        // } else{
        //     logger.info(`${req.method} ${req.ip}${req.url} - success`);
        // }

        res.json({
            data: data
        }).status(200);
    });

    // 코인 검색
    route.get("/:id", async (req: Request, res: Response) => {
        const coinId = req.params.id;
        const data = await coinGecko.default.getCurrentCoin(coinId);

        // if(data["success"] == false){
        //     logger.warn(`${req.method} ${req.ip}${req.url} - fail`);
        // } else{
        //     logger.info(`${req.method} ${req.ip}${req.url} - success`);
        // }

        res.json({
            data: data
        }).status(200);
    });    
}