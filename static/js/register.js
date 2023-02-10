import { measurementsCheck, nameCheck, checkDate } from "./form-validation.js";
const overlayHTML = '<div class="overlaye"><h1>הרשמה</h1></div>';
const overlay = document.createElement("div");
overlay.innerHTML = overlayHTML;
header.appendChild(overlay);

const heightInput = document.getElementById("height");
const WeightInput = document.getElementById("weight");
const armsInput = document.getElementById("arms");
const chestInput = document.getElementById("chest");
const waistInput = document.getElementById("waist");
const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const dobInput = document.getElementById("bod");
const genderInput = document.getElementById("gender");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const nextButton = document.getElementById("nextPage");
const form = document.querySelector("form");
dobInput.value = new Date().toISOString().split("T")[0];

// Insert user values of inputs into new user
async function checkUsername() {
  const username = userNameInput.value;
  if (!username) return;

  const response = await fetch(
    `http://localhost:3000/check-username/${username}`
  );

  const data = await response.json();
  if (!data.available) {
    alert("שם משתמש זה כבר קיים במערכת");
    userNameInput.value = "";
  }
}

userNameInput.onblur = checkUsername;

setTimeout(() => {
  checkUsername();
}, 1000);

form.addEventListener("submit", function nextPage(e) {
  e.preventDefault();
  const isValid = validation();
  if (!isValid) {
    return;
  }
  form.submit();
});

function validation() {
  return (
    passwordCheck() &&
    nameCheck(firstNameInput, lastNameInput, errorMsg) &&
    measurementsCheck(WeightInput, heightInput, 1, 1, 1, errorMsg) &&
    checkDate(dobInput, errorMsg)
  );
}

const passwordCheck = function () {
  if (passwordInput.value.length < 6) {
    errorMsg("הסיסמא אמורה להיות באורך 6 תוים לפחות.");
    return false;
  }
  if (passwordInput.value !== repasswordInput.value) {
    errorMsg("הסיסמאות אינן תואמות.");
    return false;
  }
  return true;
};

phoneInput.oninput = function (e) {
  if (
    phoneInput.value.length === 3 &&
    e.inputType !== "deleteContentBackward"
  ) {
    phoneInput.value += "-";
  }
  if (phoneInput.value.length > 11) {
    errorMsg("אורך מס' טלפון הוא עד 11 תווים.");
  } else {
    const alertContainer = document.getElementById("alert");
    alertContainer.style.opacity = "0";
  }
};
