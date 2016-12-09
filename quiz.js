var inventory = [];
loadInventory();

// function populatePage (inventory) {
//   // Loop over the inventory and populate the page

//   // Now that the DOM is loaded, establish all the event listeners needed
//   activateEvents();
// }

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory (callback) {
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) {
  loadInventory = JSON.parse(e.target.responseText);
  console.log("load complete");
  console.log("JSON", loadInventory);
  });
  inventoryLoader.open("GET", "inventory.json");
  inventoryLoader.send();
}
