const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const config = require("./config.json");
import startupFriendService from "./friendmanager"

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
	steam: client,
	community: community,
	language: 'en'
});

const logOnOptions = {
    accountName: config.username,
    password: config.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret);
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
  
    client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed(440);
  });

client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
  
    community.setCookies(cookies);
    community.startConfirmationChecker(10000, 'identity_secret');
    startupFriendService();
  });

manager.on('newOffer', offer => {
    if (offer.partner.getSteamID64() === 'trusted_account_id') {
      offer.accept((err, status) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Accepted offer. Status: ${status}.`);
        }
      });
    }
  });

  manager.on('newOffer', offer => {
    if (offer.itemsToGive.length === 0) {
      offer.accept((err, status) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Donation accepted. Status: ${status}.`);
        }
      });
    } else {
      offer.decline(err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Donation declined (wanted our items).');
        }
      });
    }
  });

function sendRandomItem() {
    manager.getInventoryContents(440, 2, true, (err, inventory) => {
      if (err) {
        console.log(err);
      } else {
        const offer = manager.createOffer('partner_steam_id');
        const item = inventory[Math.floor(Math.random() * inventory.length - 1)];
  
        offer.addMyItem(item);
        offer.setMessage(`Lucky you! You get a ${item.name}!`);
        offer.send((err, status) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Sent offer. Status: ${status}.`);
          }
        });
      }
    });
}