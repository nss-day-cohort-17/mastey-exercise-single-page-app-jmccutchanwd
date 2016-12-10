/* ====== By John McCutchan ======== */
/* ================================= */
//
/* ====== Global Vars ============== */
/* ================================= */
var inventory = [];
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
    inventory += `<div class="col-lg-4 col-md-6">
                  <div class="card">
                  <img class="card-img-top img-xs-center" src="images/red-mustang.png" alt="Card image cap">
                  <div class="card-block">
                    <h4 class="card-title">${loadInventory.cars[i].make}</h4>
                    <h5>${loadInventory.cars[i].year}</h5>
                    <h5>${loadInventory.cars[i].model}</h5>
                    <h3>${loadInventory.cars[i].price}</h3>
                    <p class="card-text">${loadInventory.cars[i].description}</a>
                  </div>
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
