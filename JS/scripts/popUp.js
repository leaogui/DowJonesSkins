// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function executarPopUp() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  redirectForcado();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    redirectForcado();
  }
};

function redirectForcado(){
  if (window.location.pathname == '/depositar-carteira' || window.location.pathname == '/sacar-carteira')
    document.location = '/gerenciador-carteira';
  else if (window.location.pathname == '/comprarSkin' || window.location.pathname == '/retirarInvestimento')
    document.location = '/daytrade';
    else if (window.location.pathname == '/investir' || window.location.pathname == '/retirar' || window.location.pathname == '/depositar')
      document.location = '/listaskins';
}

executarPopUp();