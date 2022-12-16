import { measurementsCheck, nameCheck, checkDate } from "./form-validation.js";
const overlayHTML = '<div class="overlaye"><h1>הרשמה</h1></div>';
header.innerHTML += overlayHTML;

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

form.onsubmit = nextPage;

function nextPage(e) {
  e.preventDefault();
  const isValid = validation();
  if (!isValid) {
    return;
  }

  const newUser = new Customer({
    username: userNameInput.value,
    password: passwordInput.value,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    gender: genderInput.value,
    dob: dobInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    measurements: [
      {
        date: new Date().getTime(),
        height: heightInput.value,
        chest: 0,
        arms: 0,
        waist: 0,
        weight: WeightInput.value,
      },
    ],
  });
  // adding the user to the local storage:
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.length === 0) {
    users[0] = newUser;
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }
  window.location.replace("/views/plans.html");
}

function validation() {
  return (
    passwordCheck() &&
    nameCheck(firstNameInput, lastNameInput, errorMsg) &&
    measurementsCheck(WeightInput, errorMsg) &&
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
