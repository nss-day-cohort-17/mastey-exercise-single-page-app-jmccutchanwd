/* ====== By John McCutchan ======== */
/* ================================= */
//
/* ====== Global Vars ============== */
/* ================================= */
var inventory = [ ];
loadInventory();
//
/* ================================= */
/* ====== Load JSON ================ */
/* ================================= */
function loadInventory (callback) { // Load the inventory and send a callback function to be
  var inventoryLoader = new XMLHttpRequest(); // invoked after the process is complete
  inventoryLoader.addEventListener("load", function (e) {
  loadInventory = JSON.parse(e.target.responseText);
  console.log("load complete");
  console.log("JSON", loadInventory);
  populatePage(e);
  console.log(loadInventory.cars.length);
  });
  inventoryLoader.open("GET", "inventory.json");
  inventoryLoader.send();
}
//
/* ================================= */
/* ====== Create Cards ============= */
/* ================================= */
function populatePage () {
  for(var i = 0; i < loadInventory.cars.length; i++){
    inventory += `<div class="card col-md-4">
                  <div class="card-block">
                    <h4 class="card-title">${'loadInventory.cars[i].make'}</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                  </div>  `

  }
  console.log("Inventory", loadInventory);
  document.getElementById("cardsGoHere").innerHTML = inventory;
}
//   // Loop over the inventory and populate the page

//
/* ================================= */
/* ====== Event Listeners ========== */
/* ================================= */

//   // Now that the DOM is loaded, establish all the event listeners needed
//   activateEvents();
// }
