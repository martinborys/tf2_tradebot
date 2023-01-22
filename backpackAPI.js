var requests = require("request");
const config = require("./config.json");

var url = "/classifieds/search/v1?";

class BackpackAPIService {
  constructor(key) {
    this.key = key;
    this.baseUrl = "https://backpack.tf/api";
  }

  async getCurrencies() {
    var url = this.baseUrl + "/IGetCurrencies/v1?";

    url += `key=${this.key}`;

    requests(url, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        return body;
      }
    });
  }

  searchClassifieds(buyOrSell, itemName, quality) {
    var url = this.baseUrl + "/classifieds/search/v1?";

    url +=
      `key=${this.key}` +
      `&intent=${buyOrSell}` +
      `&item=${item}` +
      `&quality=${quality}`;

    requests(url, (err, response, body) => {
      if (err) {
        console.log(err);
        return null;
      } else {
        return body;
      }
    });
  }
}

const backpackAPIService = new BackpackAPIService(config.backpackKey);
var currencies = backpackAPIService.getCurrencies();
console.log(JSON.stringify(currencies));
