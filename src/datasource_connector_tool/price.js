const Price = function(priceData) {
  return {
    ...priceData,
    mid() {
      const midPrice = (this.buy + this.sell) / 2;
      return Number((midPrice / 100).toFixed(3));
    },
    quote() {
      return this.pair.substring(3);
    },
  }
};

module.exports = Price;