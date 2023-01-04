const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
	steam: client,
	community: community,
	language: 'en'
});

const logOnOptions = {
    accountName: 'marty',
    password: 'steam-pass',
    twoFactorCode: 'steam-secret'
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