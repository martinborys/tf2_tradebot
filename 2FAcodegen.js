const SteamTotp = require("steam-totp");
const config = require("./config.json");

console.log(SteamTotp.generateAuthCode(config.sharedSecret));
