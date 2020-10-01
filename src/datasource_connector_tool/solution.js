// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.  
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).

const Datasource = require('./datasource');

const ds = new Datasource();

ds.getPrices()
  .then(prices => {
    prices.forEach(price => {
      console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
    });
  }).catch(error => {
    console.log(error);
  });