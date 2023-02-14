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

async function next(e) {
  e.preventDefault();
  const methodSelected = document.getElementById("method");
  const couponInput = document.getElementById("copun");
  const plan = document.getElementById("plan");
  if (
    checkNotEmpty(methodSelected.value, "method") &&
    checkNotEmpty(plan.value, "plan") &&
    checkCopun(couponInput.value)
  ) {
    checkMethod(methodSelected);
    const response = await fetch("http://localhost:3000/choose-plan", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethod: methodSelected.value,
        packageID: plan.value,
        discount: couponInput.value == "Web2022" ? 0.3 : 0,
      }),
    });

    if (response.status === 401) {
      window.location.replace("login/?from=plans");
    }

    if (response.status === 200) {
      alert("התשלום התקבל בהצלחה");
      window.location.replace("http://localhost:3000/home");
    }
  } else {
    return;
  }
}

const validation = function () {
  return (
    checkNotEmpty(methodSelected.value, "method") &&
    checkNotEmpty(plan.value, "plan") &&
    checkCopun(couponInput.value)
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
}
function checkCopun(copun) {
  if (copun == "Web2022" || copun == "") {
    return true;
  }
  errorMsg("קוד קופון לא קיים במערכת.");
  return false;
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

setTimeout(() => {
  const params = new URLSearchParams(window.location.search);
  const message = params.get("message");
  if ("successful-registration" == message) {
    alert("הרשמתך התקבלה! בחר תוכנית");
  }
}, 500);
