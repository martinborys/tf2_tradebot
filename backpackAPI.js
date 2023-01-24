var requests = require("request");
const config = require("./config.json");

var url = "/classifieds/search/v1?";

class BackpackAPIService {
  constructor(key) {
    this.key = key;
    this.baseUrl = "https://backpack.tf/api";
  }

  getCurrencies() {
    return new Promise((resolve, reject) => {
      var url = this.baseUrl + "/IGetCurrencies/v1?";

      url += `key=${this.key}`;

      requests(url, (err, response, body) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }

  searchClassifieds(itemName, quality, buyOrSell = "dual") {
    return new Promise((resolve, reject) => {
      var url = this.baseUrl + "/classifieds/search/v1?";

      url +=
        `key=${this.key}` +
        `&intent=${buyOrSell}` +
        `&item=${itemName}` +
        `&quality=${quality}`;

      requests(url, (err, response, body) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }
}

async function main() {
  const backpackAPIService = new BackpackAPIService(config.backpackKey);
  var currencies = await backpackAPIService.getCurrencies();
  console.log(currencies);
}
main();
