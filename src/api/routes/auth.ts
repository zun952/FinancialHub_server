import { Router, Request, Response, NextFunction } from "express";
import DbInstance from "../../database/DbInstance";
import { logger } from "../../winston";

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    // user login
    route.get("/signin/:id", async (req: Request, res: Response, next: NextFunction) => {
        let resData;

        try {
            const conn = await DbInstance.getInstance();

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

        return res.json(resData).status(200);
    });

    // add user account
    route.post("/signup", (req: Request, res: Response, next: NextFunction) => {
        const{
            body: { id, password }
        } = req;
        
        return res.json({
            id: id,
            pw: password
        }).status(200);
    });
}