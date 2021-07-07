import { logger } from './winston';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});

const markets = async(): Promise<any> => {
    return await client.coinMarket({ vs_currency: 'krw', ids: 'btc, ' })
        .then((result: any) => {
            logger.info(`get All data from CoinGecko API`);

            return result;
        }).catch((err: any) => {
            throw err;
        });
}

const getCurrentCoin = async(id: string): Promise<any> => {
    return await client.coinIdTickers({ id: id })
        .then((result: any) => {
            logger.info(`get ${id} data from CoinGecko API`);

            return result;
        }).catch((err: any) => {
            throw err;
        });
}

export default { markets, getCurrentCoin };