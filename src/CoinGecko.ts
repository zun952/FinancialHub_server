import logger from './winston';
const coinGecko = require('coingecko-api');

const coinGeckoClient = new coinGecko();

const markets = async(): Promise<any> => {
    return await coinGeckoClient.coins.markets({ vs_currency: 'krw' })
        .then((result: any) => {
            logger.info(`get All data from CoinGecko API`);

            return result;
        }).catch((err: any) => {
            throw err;
        });
}

const getCurrentCoin = async(id: string): Promise<any> => {
    return await coinGeckoClient.coins.fetch(id, {
        tickers: false,
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false
    })
        .then((result: any) => {
            logger.info(`get ${id} data from CoinGecko API`);

            return result;
        }).catch((err: any) => {
            throw err;
        });
}

export default { markets, getCurrentCoin };