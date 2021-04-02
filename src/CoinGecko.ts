import logger from './winston';
const coinGecko = require('coingecko-api');

const coinGeckoClient = new coinGecko();

let markets = async(): Promise<any> => {
    return await coinGeckoClient.coins.markets({ vs_currency: 'krw' })
        .then((result: any) => {
            return result;
        }).catch((err: any) => {
            return err;
        });
}

export default { markets };