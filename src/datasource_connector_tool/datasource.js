const https = require('https');
const Price = require('./price');

class Datasource {
  static dataSourceUrl = 'https://static.ngnrs.io/test/prices';

  getPrices() {
    return new Promise((resolve, reject) => {
      https.get(Datasource.dataSourceUrl, res => {
        const {statusCode} = res;
        if (statusCode !== 200) {
          reject('Request Failed.\n' + `Status Code: ${statusCode}`);
        }

        let rawData = '';
        res.on('data', chunk => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData.data.prices);
          } catch (error) {
            reject(error.message);
          }
        });
      }).on('error', error => {
        reject(`Got error: ${error.message}`);
      });
    }).then(prices => prices.map(price => new Price(price)));
  }
}

module.exports = Datasource;
