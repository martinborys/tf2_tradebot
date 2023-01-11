module.exports = {
  printInventory,
};

function printInventory(manager) {
  manager.getInventoryContents(440, 2, true, (err, inventory) => {
    if (err) {
      console.log(err);
    } else {
      inventory.forEach((item) => {
        console.log(`Item: ${item.name} Amount: ${item.amount}`);
      });
    }
  });
}
