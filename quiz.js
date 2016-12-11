/* ================================= */
/* ====== By John McCutchan ======== */
/* ================================= */
//
console.log("Begin."); //**** Message
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
                      <img class="card-img-top img-fluid img-xs-center" ${loadInventory.cars[i].img} alt="Card image cap">
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
  document.getElementById("modText").addEventListener("click", focusDescription); // input listener
  document.getElementById("submitButton").addEventListener("click", changeDescription); // submit button listener
  document.getElementById("cardsGoHere").addEventListener("click", focusDescription); // <p> tag click listener
  console.log("Listeners turned on."); //**** Message
} // End function
//
/* ================================= */
/* Focus When Description Clicked == */
/* ================================= */
function focusDescription(e){
  if ((e.target.localName === "p")&&(counter === false)){ // checks that <p> was clicked, and its the only one
    focusTgt = e.target; // assigns the value of what is clicked to a global var
    focusTgt.className = "focusStyle"; // assigns the <p> in focus a new style that gives it a border and background
    counter = true; // flips the counter var to ensure only one <p> is selected
    document.getElementById("modText").focus(); // Adds focus and cursor to text input
    console.log("Focus applied."); //**** Message
    document.getElementById("modText").value = focusTgt.innerText; // loads description to input field
  }
} // End function
//
/* ================================= */
/* ====== Change Description ======= */
/* ================================= */
function changeDescription(e){
  var transfer = document.getElementById("modText").value; // assigns input value to a local var
  focusTgt.innerText = transfer; // assigns the input value to the <p> inner HTML
  console.log("Description changed."); //**** Message
  focusGone(); // calls Reset Focus
}
//
/* ================================= */
/* ====== Reset Focus ============== */
/* ================================= */
function focusGone(e){
  focusTgt.className = "card-text"; // resets the <p> text class back to normal
  document.getElementById("modText").value = ""; // clears input field
  console.log("Removed focus."); //**** Message
  counter = false; // resets global counter to false
  document.getElementById("modText").blur(); // takes focus off input field
} // End function
// END
