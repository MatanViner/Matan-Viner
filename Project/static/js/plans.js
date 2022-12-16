

const nextPage = document.getElementById("nextPage");
nextPage.onclick = next;
const TOTALPRICE = 100;
const startDateInput = document.getElementById("startDate");
startDateInput.min = new Date().toISOString().split("T")[0];
startDateInput.value = new Date().toISOString().split("T")[0];
const overlayHTML = '<div class="overlaye"><h1>החבילות שלנו</h1></div>';
header.innerHTML += overlayHTML;

function next(e) {
  e.preventDefault();
  const methodSelected = document.getElementById("method");
  const copunInput = document.getElementById("copun");
  if (checkCupon(copunInput) && checkNotEmpty(methodSelected.value)) {
    checkMethod(methodSelected);
  }
}

function checkMethod(methodSelected) {
  console.log(methodSelected.value);
  if (methodSelected.value === "PayPal") {
    window.open("https://www.paypal.com/us/signin", "_blank");
    return;
  }
  if (methodSelected.value === "Bit") {
    window.open("https://www.bitpay.co.il/he", "_blank");
    return;
  }
  if (methodSelected.value === "card") {
    window.location.replace("/views/payment.html");
    return;
  }
}

function checkCupon(copunInput) {
  if (copunInput.value !== "Web2022" && copunInput.value.length != 0) {
    errorMsg("קוד קופון לא קיים");
    return false;
  }
  return true;
}

function checkNotEmpty(method) {
  if (method === 0) {
    errorMsg("אנא בחר/י אמצעי תשלום");
    return false;
  }
  return true;
}
