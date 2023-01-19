var requests = require("request");
const config = require("config.json");

const key = config.backpackKey;
const item = "";
var url = "https://backpack.tf/api/classifieds/search/v1?";

url += `&item=${item}`;
url += `&key=${key}`;

requests(url);
