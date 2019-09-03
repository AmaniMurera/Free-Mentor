	
/* program toggle button */
let navClose = document.getElementById('js-navbar-close');
let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");


navBarToggle.addEventListener("click", function() {
mainNav.classList.toggle("active");
navBarToggle.classList.toggle("hide");
navClose.classList.toggle("show");

});
navClose.addEventListener("click", function() {
mainNav.classList.toggle("active");
navBarToggle.classList.toggle("hide");
navClose.classList.toggle("show");

});


/* view specific mentor */

var myPopup = document.getElementById('myPopup');
var modelbtn = document.getElementsByClassName("modelbtn");
var span = document.getElementsByClassName("close")[0];

for(var x = 0; x<15;x++){
    modelbtn[x].onclick  = function(){
        myPopup.style.display = "block";
    }
}
 


 span.onclick  = function(){
    myPopup.style.display = "none";
}
// window.onclick = function(e) {
//     if (e.target == myPopup) {
//         myPopup.style.display = "none";
//     }
// }



let dialogbox = (message) => { // Get the modal
    const modal = document.querySelector('#dialogbox');
  
    const divMsg = document.querySelector('.dialog-content-js');
  
  
    divMsg.textContent = message;
    // Display the modal
    modal.style.display = 'block';
  };
  // Function close the dialog box
  const closeDialog = () => {
    document.querySelector('.modal').style.display = 'none';
    const modal = document.querySelector('#dialogbox');
    modal.style.display = 'none';
  };













