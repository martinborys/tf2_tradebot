const SteamUser = require("steam-user");
const SteamTotp = require("steam-totp");
const SteamCommunity = require("steamcommunity");
const TradeOfferManager = require("steam-tradeoffer-manager");
const config = require("./config.json");
var helpers = require("./helpers.js");

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: "en",
});

// LOGIN SECTION

const twoFactorCode = SteamTotp.generateAuthCode(config.sharedSecret);

const logOnOptions = {
  accountName: config.username,
  password: config.password,
  twoFactorCode: twoFactorCode,
};

client.logOn(logOnOptions);

client.on("loggedOn", () => {
  console.log("Logged into Steam");

  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed(440);

  client.getAuthSecret((err, secret, key) => {
    if (err) {
      console.log(err);
    } else {
      console.log(secret);
      console.log(key);
    }
  });
});

client.on("webSession", (sessionid, cookies) => {
  manager.setCookies(cookies);

  community.setCookies(cookies);
  community.startConfirmationChecker(10000, "identity_secret");
  console.log(cookies);
});

manager.on("newOffer", (offer) => {
  // check if offer is from trusted user
  if (offer.partner.getSteamID64() === config.trustedUser) {
    offer.accept((err, status) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Accepted offer. Status: ${status}.`);
      }
    });
  }
});

// check if trade offer is donation
if (offer.itemsToGive.length === 0) {
  offer.accept((err, status) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Donation accepted. Status: ${status}.`);
    }
  });
}

// on friend request, accept user and send message
client.on("friendRelationship", (steamid, relationship) => {
  if (relationship === 2) {
    console.log(`New Friend Request - SteamID: ${steamid}`);
    client.addFriend(steamid, (err, personalName) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully added user: ${personalName}`);
      }
    });
  }
});
