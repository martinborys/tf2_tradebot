function startupFriendService(client) {
  client.on('friendRelationship', (steamid, relationship) => {
    if (relationship === 2) {
      client.addFriend(steamid);
      client.chatMessage(steamid, 'Hello there! Thanks for adding me!');
    }
  });
}