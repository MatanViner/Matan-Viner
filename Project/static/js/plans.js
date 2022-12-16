const nextPage = document.getElementById("nextPage");
nextPage.onclick = next;
const TOTALPRICE = 100;
const startDateInput = document.getElementById("startDate");
startDateInput.min = new Date().toISOString().split("T")[0];
startDateInput.value = new Date().toISOString().split("T")[0];
const overlayHTML = '<div class="overlaye"><h1>בחר תוכנית</h1></div>';
const overlay = document.createElement("div");
overlay.innerHTML = overlayHTML;
header.appendChild(overlay);

function next(e) {
  e.preventDefault();
  const methodSelected = document.getElementById("method");
  const copunInput = document.getElementById("copun");
  const plan = document.getElementById("plan");
  if (
    checkCupon(copunInput) &&
    checkNotEmpty(methodSelected.value, "method") &&
    checkNotEmpty(plan.value, "plan")
  ) {
    checkMethod(methodSelected);
  } else {
    return;
  }
}

const validation = function () {
  return (
    checkCupon(copunInput) &&
    checkNotEmpty(methodSelected.value, "method") &&
    checkNotEmpty(plan.value, "plan")
  );
};

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

function checkNotEmpty(input, type) {
  if (type === "method") {
    if (input === "") {
      errorMsg("אנא בחר/י אמצעי תשלום");
      return false;
    }
  }
  if (type === "plan") {
    if (input === "") {
      errorMsg("אנא בחר/י תוכנית");
      return false;
    }
  }
  return true;
}
