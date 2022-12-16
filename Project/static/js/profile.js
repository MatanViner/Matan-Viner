//checks if user is loged in
const userJson = localStorage.getItem("currentUser");
if (!userJson) {
  window.location.replace("/views/login.html?from=profile");
}
const user = JSON.parse(userJson);
//get measurements inputs
const newMeasurementButton = document.getElementById("measurebutton");
const updateButton = document.getElementById("update");
const heightInput = document.getElementById("height");
const WeightInput = document.getElementById("weight");
const armsInput = document.getElementById("arms");
const chestInput = document.getElementById("chest");
const waistInput = document.getElementById("waist");
//get profile details
const newDetailsButton = document.getElementById("");
const userNameInput = document.getElementById("username");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const bodInput = document.getElementById("bod");
const genderInput = document.getElementById("gender");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const joinDateInput = document.getElementById("joinDate");
//Insert active user measuers values to the inputs
heightInput.value = user.measurements[user.measurements.length - 1].height;
WeightInput.value = user.measurements[user.measurements.length - 1].weight;
armsInput.value = user.measurements[user.measurements.length - 1].arms;
chestInput.value = user.measurements[user.measurements.length - 1].chest;
waistInput.value = user.measurements[user.measurements.length - 1].waist;
//Insert active user profile details
userNameInput.value = user.username;
firstNameInput.value = user.firstName;
lastNameInput.value = user.lastName;
bodInput.value = new Date(user.dob).toISOString().split("T")[0];
phoneInput.value = user.phone;
emailInput.value = user.email;
genderInput.value = user.gender;
joinDateInput.value = new Date(user.joinDate)

//START MEASURE BUTTON FUNCTION//
function newMeasure(e) {
  e.preventDefault();
  document
    .querySelectorAll("form#measurements input")
    .forEach((input) => (input.disabled = false));
  newMeasurementButton.innerText = "שמור מדידה";
  newMeasurementButton.onclick = saveMeasure;
}

function saveMeasure(e) {
  e.preventDefault();

  const height = parseFloat(heightInput.value);
  if (height == 0) {
    alert("Height cannot be 0");
  }

  const measure = {
    date: new Date().getTime(), // 32432784234 -> new Date(4243214234).
    arms: armsInput.value,
    chest: chestInput.value,
    height: heightInput.value,
    waist: waistInput.value,
    weight: WeightInput.value,
  };

  // save
  user.measurements.push(measure);
  localStorage.setItem("currentUser", JSON.stringify(user));
  document
    .querySelectorAll("form#measurements input")
    .forEach((input) => (input.disabled = true));
  newMeasurementButton.onclick = newMeasure;
  newMeasurementButton.innerText = "מדידה חדשה";
}
//START MEASURE BUTTON FUNCTION//

//START UPDATE BUTTON FUNCTIONS//
function update(e) {
  e.preventDefault();
  document
    .querySelectorAll("form#personal-details input")
    .forEach((input) => (input.disabled = false));
  updateButton.innerText = "שמור פרטים";
  updateButton.onclick = saveUpdate;
}

function saveUpdate(e) {
  e.preventDefault();
  user.username = userNameInput.value;
  user.firstName = firstNameInput.value;
  user.lastName = lastNameInput.value;
  user.bod = bodInput.value;
  user.phone = phoneInput.value;
  user.email = emailInput.value;
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateButton.innerText = "עדכן פרטים";
  document
    .querySelectorAll("form#personal-details input")
    .forEach((input) => (input.disabled = true));
  updateButton.onclick = update;
}
//END UPDATE BUTTON FUNCTIONS//
updateButton.onclick = update;
newMeasurementButton.onclick = newMeasure;
//

//click on progress button
const progressButton = document.querySelector("#progressbutton");

progressButton.onclick = function (e) {
  e.preventDefault();
  window.location.replace("/views/progress.html");
};

//click on calculator button
const calculatorButton = document.querySelector("#calculatebutton");

calculatorButton.onclick = function (e) {
  e.preventDefault();
  window.location.replace("/views/Calculators.html");
};
