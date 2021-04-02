import mariadb from 'mariadb';
import connectionData from './dbconfig';

class DBInstance {
    private static instance: mariadb.PoolConnection;

    private constructor(){}

    public static getInstance = async () => {
        if(!DBInstance.instance){
            const pool = mariadb.createPool({
                host: connectionData().host,
                user: connectionData().user,
                password: connectionData().password,
                port: connectionData().port,
                database: connectionData().database,
                connectionLimit: 5
            });

            try{
                const conn = pool.getConnection();

                if(conn == undefined){
                }

                return conn;
            } catch(err){
                throw err;
            }
        }
    }
}

export default DBInstance ;