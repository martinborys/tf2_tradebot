const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const client = new SteamUser();

const logOnOptions = {
    accountName: 'martyb_s8',
    password: 'steam-spass',
    twoFactorCode: 'steam-secret'
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
  
    client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed(440);
  });