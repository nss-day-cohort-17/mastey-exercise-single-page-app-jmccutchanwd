/* ================================= */
/* By John McCutchan =============== */
/* ================================= */
//
console.log("1.Begin."); //**** Message *********************************************************************************1
loadInventory(); // load the JSON
/*
Deploy this to be able to point and click and find the properties of anything in the DOM.
Results are displayed in the console.
*/
console.log("Element Finder Loaded");
document.querySelector("body").addEventListener("click", function(e) {
  console.log(e);
});
//
/* ============ END ================ */
//
/* ================================= */
/* Global Vars ===================== */
/* ================================= */
var inventory = []; // container for inner html
var tgtFocus; // container for .card data
//
/* ================================= */
/* Load JSON ======================= */
/* ================================= */
function loadInventory (callback) { // Load the inventory
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) { // Callback .......=
  loadInventory = JSON.parse(e.target.responseText);//.......................=
  console.log("2.Load complete.");//.........................................=**** Message ******************************2
  console.log("3.JSON: ", loadInventory);//..................................=**** Shows the JSON ***********************3
  populatePage(e);//.........................................................=**** Calls the populatePage function
  console.log("5.Number of cars in inventory: ",loadInventory.cars.length);//=**** Number of cars in inventory **********5
  });//..................This is not called until after the section below is =
  inventoryLoader.open("GET", "https://car-sales-jm.firebaseio.com/.json"); // JSON Called from Firebase :)
  inventoryLoader.send(); // engage
}
//
/* ================================= */
/* Create Cards ==================== */
/* ================================= */
function populatePage () { // called by loadInventory()
  for(var i = 0; i < loadInventory.cars.length; i++){ // Loops through the JSON Parse to create inner HTML
    inventory += `<div class="col-lg-4 col-md-6">
                    <div class="card">
                      <div class="card-block">
                        <img class="card-img-top img-fluid img-xs-center vis" ${loadInventory.cars[i].img} alt="Card image cap">
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
/* Event Listeners ================= */
/* ================================= */
function activateEvents(e){ // called by populatePage()
  document.getElementById("cardsGoHere").addEventListener("click", focusCard);  // to listen in inner HTML
  document.getElementById("modText").addEventListener("keyup", fillText); // to listen for key release in input field
  console.log("4.Listeners turned on."); //**** Message *****************************************************************4
}
//
/* ================================= */
/* Focus When Card Clicked ========= */
/* ================================= */
function focusCard(e){ // called by clicking on card via listener above
  tgtFocus = e.target; // focuses on DOM near div.card
  document.getElementById("submitButton").blur(); // takes focus off of button
  if (document.getElementById('focusStyle')) {
          var oldFocus = document.getElementById('focusStyle');
          oldFocus.id = "";// deselects previous selected
  }
  if ((tgtFocus.className === "vis year") ||
      (tgtFocus.className === "vis card-title") ||
      (tgtFocus.className === "vis model") ||
      (tgtFocus.className === "vis price") ||
      (tgtFocus.className === "card-img-top img-fluid img-xs-center vis") ||
      (tgtFocus.className === "vis card-text")){ // id attribute of .card
      tgtFocus.parentNode.id = "focusStyle"; // applies special styling focus to .card
      console.log("TESTING after click", tgtFocus.closest('div').getElementsByTagName('p'));
    typeDescription(); // calls input text function
  }
}
//
/* ================================= */
/* Transfer Type to Input ========== */
/* ================================= */
function typeDescription(e){ // called by focusCard()
  if(tgtFocus.parentNode.id === "focusStyle") { // makes sure you are on description block
    document.getElementById("submitButton").addEventListener("click", buttonSubmit); // button listener
    document.getElementById('modText').focus(); // puts focus on text input
    document.getElementById("modText").value = tgtFocus.closest('div').getElementsByTagName('p')[0].innerHTML; // transfers description to input field
    console.log("TESTING", tgtFocus);
    /*
    1. Also, on click of the car element, clear the value of the text input in the navbar, and put the cursor in the text input.
    2. When you start typing into the navbar's text input, the description, and only that property, of the currently selected
    car should be bound to what you are typing in and match it exactly.
    */
  }
}
//
/* ================================= */
/* Transfer Type to Page =========== */
/* ================================= */
function fillText(){ // called by keyup listener in input field
  tgtFocus.closest('div').getElementsByTagName('p')[0].innerHTML = document.getElementById("modText").value; // transfers input field changes to html
}
//
/* ================================= */
/* Submit Button =================== */
/* ================================= */
function buttonSubmit(){ // called by button listener in typeDescription()
  tgtFocus.innerHTML = document.getElementById("modText").value; // transfers input field changes to html, last time
  tgtFocus.parentNode.id = ""; // clears focus style from card
  document.getElementById("modText").blur(); // blurs input field
  document.getElementById("modText").value = ""; // clears input field
  document.getElementById("submitButton").blur(); // takes focus off of button
}
//
// END
