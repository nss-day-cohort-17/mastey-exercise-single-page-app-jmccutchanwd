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
  console.log("load complete");//******************************************
  console.log("JSON", loadInventory);//************************************
  populatePage(e);
  console.log(loadInventory.cars.length);
  });
  inventoryLoader.open("GET", "https://car-sales-jm.firebaseio.com/.json");
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
  console.log("Inventory", inventory);//***********************************
  document.getElementById("cardsGoHere").innerHTML = inventory;
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

/*

src="images/05-crown-vic.png'
src='images/05-mustang.png'
src='images/06-rogue.png'
src='images/09-corolla.png'
src='images/11-rogue.png'
src='images/14-mustang-gt.png'
src='images/15-mustang-gt.png'
src='images/19-ranger.png'













*/
