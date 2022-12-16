
const overlayHTML = '<div class="overlaye"><h1>תשלום מקוון</h1></div>';
header.innerHTML += overlayHTML;

const cardInput = document.getElementById("cardNum");
const yearInput = document.getElementById("year");
const mounthInput = document.getElementById("mounth");
const typeInput = document.getElementById("type");
const payButton = document.getElementById("payButton");
payButton.onclick = pay;

function pay(e) {
  e.preventDefault();
  if (!checkForNums(cardInput.value)) {
    errorMsg("מספר כרטיס הוא רק ספרות");
    return;
  }
  if (cardInput.value != 16) {
    errorMsg("מספר כרטיס מכיל 16 ספרות.");
    return;
  }
}
