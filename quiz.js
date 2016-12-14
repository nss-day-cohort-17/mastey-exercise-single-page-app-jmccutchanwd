/* ================================= */
/* ====== By John McCutchan ======== */
/* ================================= */
//
console.log("1.Begin."); //**** Message ******************************************************1
loadInventory();
//
/* ================================= */
/* ====== Global Vars ============== */
/* ================================= */
var inventory = []; // container for inner html
var tgtFocus; // container for .card data
//
/* ================================= */
/* ====== Load JSON ================ */
/* ================================= */
function loadInventory (callback) { // Load the inventory
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) { // Callback .......=
  loadInventory = JSON.parse(e.target.responseText);//.......................=
  console.log("2.Load complete.");//...........................................=**** Message ****************************2
  console.log("3.JSON: ", loadInventory);//....................................=**** Shows the JSON *********************3
  populatePage(e);//.........................................................=**** Calls the populatePage function
  console.log("4.Number of cars in inventory: ",loadInventory.cars.length);//..=**** Number of cars in inventory ********4
  });//..................This is not called until after the section below is =
  inventoryLoader.open("GET", "https://car-sales-jm.firebaseio.com/.json"); // JSON Called from Firebase :)
  inventoryLoader.send();
}
//
/* +++++++++ DEV TOOL ++++++++++++++ */
// document.querySelector("body").addEventListener("click", function(e) {
//   console.log(e);
// });
/* +++ REMOVE BEFORE PRODUCTION ++++ */
//
/* ================================= */
/* ====== Create Cards ============= */
/* ================================= */
function populatePage () {
  for(var i = 0; i < loadInventory.cars.length; i++){ // Loops through the JSON Parse to creat inner HTML
    inventory += `<div class="col-lg-4 col-md-6">
                    <div class="card">
                      <img class="card-img-top img-fluid img-xs-center vis" ${loadInventory.cars[i].img} alt="Card image cap">
                      <div class="card-block">
                        <h4 class="vis card-title">${loadInventory.cars[i].make}</h4>
                        <h5 class="vis year">${loadInventory.cars[i].year}</h5>
                        <h5 class="vis model">${loadInventory.cars[i].model}</h5>
                        <h3 class="vis price">${loadInventory.cars[i].price}</h3>
                        <p class="vis card-text">${loadInventory.cars[i].description}</a>
                      </div>
                    </div>
                  </div>  `
  }
  document.getElementById("cardsGoHere").innerHTML = inventory; // Loads inventory into DOM
  activateEvents(); // calls event listeners function
}
//
/* ================================= */
/* ====== Event Listeners ========== */
/* ================================= */
function activateEvents(e){
  document.getElementById("cardsGoHere").addEventListener("click", focusCard);  // event listener to listen in inner HTML
  document.getElementById("submitButton").addEventListener("click", buttonSubmit);
  document.getElementById('modText').addEventListener("keyup", typeDescription);
  console.log("5.Listeners turned on."); //**** Message **********************************************5
}
//
/* ================================= */
/* Focus When Crad Clicked ========= */
/* ================================= */
function focusCard(e){
  var el = document.querySelector("div.card"); // focuses on DOM near div.card
  tgtFocus = el.closest("div"); // looks for div closest to .vis in <img> (.card)
  if (tgtFocus.id === ""){ // id attribute of .card
    tgtFocus.id = "focusStyle"; // applies special styling focus to .card
    document.getElementById('modText').focus(); // puts focus on text input
    console.log("6.Card Clicked: ", tgtFocus, "ID: ",tgtFocus.id); //**** Message ****************************************6
    typeDescription(); // calls input text function
  }else{ // if card already has Id of #focusStle, it gets removed
    tgtFocus.id = ""; // clears focus if card is clicked again
    document.getElementById('modText').blur(); // blurs input field
    document.getElementById('modText').value = ""; // clears input field
  }
}
//
/* ================================= */
/* Type Description ================ */
/* ================================= */
function typeDescription(e){
  document.getElementById("modText").value = document.querySelector("p.card-text").innerHTML; // loads text from <p> to input
  console.log("7.Whats in pFocus", document.getElementById("modText").value); //**** Message *************Trouble Shooting ********7
}
//
/* ================================= */
/* Submit Button =================== */
/* ================================= */
function buttonSubmit(e){
  tgtFocus.id = ""; // clears focus style from card
  document.getElementById('modText').blur(); // blurs input field
  // document.getElementById('modText').value = ""; // clears input field
}
//
// END
