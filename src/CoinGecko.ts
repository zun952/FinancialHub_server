const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

let markets = async(): Promise<any> => {
    return await CoinGeckoClient.coins.markets({
        vs_currency: 'krw'
    });
}

export default { markets };