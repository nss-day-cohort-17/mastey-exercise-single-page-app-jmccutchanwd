/* ====== By John McCutchan ======== */
/* ================================= */
//
/* +++++++++ DEV TOOL ++++++++++++++ */
document.querySelector("body").addEventListener("click", function(e) {
  console.log(e);
});
/* +++ REMOVE BEFORE PRODUCTION ++++ */
//
/* ================================= */
/* ====== Global Vars ============== */
/* ================================= */
var inventory = [];
loadInventory();
//
/* ================================= */
/* ====== Load JSON ================ */
/* ================================= */
function loadInventory (callback) { // Load the inventory
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) { // Callback =
  loadInventory = JSON.parse(e.target.responseText);//................=
  console.log("load complete");//.....................................=**** Message
  console.log("JSON", loadInventory);//...............................=**** Shows the JSON
  populatePage(e);//..................................................=
  console.log(loadInventory.cars.length);//...........................=
  });//...........This is not called until after the section below is =
  inventoryLoader.open("GET", "https://car-sales-jm.firebaseio.com/.json"); // JSON Called from Firebase :)
  inventoryLoader.send();
}
//
/* ================================= */
/* ====== Create Cards ============= */
/* ================================= */
function populatePage () {
  for(var i = 0; i < loadInventory.cars.length; i++){ // Loops through the JSON Parse to creat inner HTML
    inventory += `<div class="col-lg-4 col-md-6">
                  <div class="card">
                  <img class="card-img-top img-xs-center" ${loadInventory.cars[i].img} alt="Card image cap">
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
  // console.log("Inventory", inventory);//********************************** Shows the inner HTML string
  document.getElementById("cardsGoHere").innerHTML = inventory; // Loads inventory into DOM
  // console.log(inventory);
}

//   // Loop over the inventory and populate the page

//
/* ================================= */
/* ====== Event Listeners ========== */
/* ================================= */

//   // Now that the DOM is loaded, establish all the event listeners needed
//   activateEvents();
// }
