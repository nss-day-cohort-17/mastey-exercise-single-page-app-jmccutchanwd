/* ================================= */
/* ====== By John McCutchan ======== */
/* ================================= */
//
console.log("Begin."); //**** Message
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
var focusTgt = "";
var counter = false;
//
/* ================================= */
/* ====== Load JSON ================ */
/* ================================= */
function loadInventory (callback) { // Load the inventory
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) { // Callback .......=
  loadInventory = JSON.parse(e.target.responseText);//.......................=
  console.log("Load complete.");//...........................................=**** Message
  console.log("JSON: ", loadInventory);//....................................=**** Shows the JSON
  populatePage(e);//.........................................................=
  console.log("Number of cars in inventory: ",loadInventory.cars.length);//..=**** Number of cars in inventory
  });//..................This is not called until after the section below is =
  inventoryLoader.open("GET", "https://car-sales-jm.firebaseio.com/.json"); // JSON Called from Firebase :)
  inventoryLoader.send();
} // End function
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
                        <h5 class="year">${loadInventory.cars[i].year}</h5>
                        <h5 class="model">${loadInventory.cars[i].model}</h5>
                        <h3 class="price">${loadInventory.cars[i].price}</h3>
                        <p class="card-text">${loadInventory.cars[i].description}</a>
                      </div>
                    </div>
                  </div>  `
  } // End loop
  // console.log("Inventory", inventory);//**** Shows the inner HTML string
  document.getElementById("cardsGoHere").innerHTML = inventory; // Loads inventory into DOM
  activateEvents();
} // End function
//
/* ================================= */
/* ====== Event Listeners ========== */
/* ================================= */
function activateEvents(){
  document.getElementById("modText").addEventListener("click", changeDescription);
  document.getElementById("submitButton").addEventListener("click", changeDescription);
  document.getElementById("cardsGoHere").addEventListener("click", focusDescription);
  console.log("Listeners turned on."); //**** Message
} // End function
//
/* ================================= */
/* Focus When Description Clicked == */
/* ================================= */
/*You should add a function that changes the thickness of the border of a car element, and changes its background color. The function must accept two arguments:
    1. A car DOM element that was clicked on.
    1. A color name of your choice (see behavior requirement 5 above). */
function focusDescription(e){
  if ((e.target.localName === "p")&&(counter === false)){
    focusTgt = e.target;
    focusTgt.className = "focusStyle";
    counter = true;
    document.getElementById("modText").focus(); // Adds focus and cursor to text input
    console.log("Focus applied."); //**** Message
  }
  document.getElementById("modText").value = focusTgt.innerText; // loads description to input field
} // End function
//
/* ================================= */
/* ====== Change Description ======= */
/* ================================= */
function changeDescription(e){
  var transfer = document.getElementById("modText").value;
  focusTgt.innerText = transfer;
  console.log("Description changed."); //**** Message
  focusGone();
}
//
/* ================================= */
/* ====== Reset Focus ============== */
/* ================================= */
function focusGone(e){
  focusTgt.className = "card-text";
  document.getElementById("modText").value = "";
  console.log("Removed focus."); //**** Message
  counter = false;
  document.getElementById("modText").blur();
} // End function
/*

// get the second's player name.
    var player1name = document.getElementById("player1name").value;

    // set the first's player name in the corresponding th.
    document.getElementById("player1").innerHTML = player1name;


<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <input id="source" type="text"/>
    <div id="target"></div>
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>

function copyData(sourceId, targetId) {
    var source = document.getElementById(sourceId);
    document.getElementById(targetId).innerHTML = source.value;
}
document.getElementById('source').oninput(function () {
    copyData('source', 'target');
}


*/



// END
