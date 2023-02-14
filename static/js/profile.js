import {
  measurementsCheck,
  nameCheck,
  checkDate,
  checkUserName,
  validatePhone,
} from "./form-validation.js";
//checks if user is loged in
if (!currentUser) {
  window.location.replace("login/?from=profile");
}
const user = currentUser;
//get measurements inputs
const updateForm = document.querySelectorAll("form#personal-details input");
const newMeasurementButton = document.getElementById("measurebutton");
const deleteButton = document.getElementById("deletebutton");
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
const dobInput = document.getElementById("bod");
const genderInput = document.getElementById("gender");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const joinDateInput = document.getElementById("joinDate");
const measureDate = document.getElementById("MeasureDate");
//Insert active user measuers values to the inputs
if (measurements.length > 0) {
  heightInput.value = measurements[measurements.length - 1].height;
  WeightInput.value = measurements[measurements.length - 1].weight;
  armsInput.value = measurements[measurements.length - 1].arms;
  chestInput.value = measurements[measurements.length - 1].chest;
  waistInput.value = measurements[measurements.length - 1].waist;
  measureDate.value = new Date(
    measurements[measurements.length - 1].measureDate
  )
    .toISOString()
    .split("T")[0];
}
//Insert active user profile details
console.log(user);

userNameInput.value = user.username;
firstNameInput.value = user.firstName;
lastNameInput.value = user.lastName;
dobInput.value = new Date(user.birthday).toISOString().split("T")[0];
phoneInput.value = user.phone;
emailInput.value = user.email;
genderInput.value = user.gender;
joinDateInput.value = new Date(user.joinDate).toISOString().split("T")[0];
phoneInput.oninput = validatePhone;
deleteButton.onclick = deleteMeasure;

//START MEASURE BUTTON FUNCTION//
function newMeasure(e) {
  e.preventDefault();
  document
    .querySelectorAll("form#measurements input")
    .forEach((input) => (input.disabled = false));
  newMeasurementButton.innerText = "שמור מדידה";
  measureDate.value = new Date().toISOString().split("T")[0];
  measureDate.disabled = true;
  newMeasurementButton.onclick = saveMeasure;
}

async function deleteMeasure(e) {
  e.preventDefault();
  if (measurements.length === 1) {
    errorMsg("לא ניתן למחוק את המדידה היחידה שיש לך.");
    return;
  }
  const username = { username: userNameInput.value };
  const response = await fetch("http://localhost:3000/api/delete-measure", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(username),
  });
  const data = await response.json();
  alert(data.message);
  window.location.reload();
}

// save measure
async function saveMeasure(e) {
  e.preventDefault();
  if (!validateInputs()) {
    return;
  }
  const UpdatedMeasure = {
    username: userNameInput.value,
    measureDate: new Date().getTime(), // 32432784234 -> new Date(4243214234).
    arms: armsInput.value,
    chest: chestInput.value,
    height: heightInput.value,
    waist: waistInput.value,
    weight: WeightInput.value,
  };
  const response = await fetch("http://localhost:3000/api/add-measure", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UpdatedMeasure),
  });
  const data = await response.json();
  alert(data.message);

  document
    .querySelectorAll("form#measurements input")
    .forEach((input) => (input.disabled = true));
  newMeasurementButton.onclick = newMeasure;
  newMeasurementButton.innerText = "מדידה חדשה";
  newMeasurementButton.setAttribute("type", "");
  window.location.reload();
}
//END

//START UPDATE BUTTON FUNCTIONS//
function update(e) {
  e.preventDefault();
  document
    .querySelectorAll("form#personal-details input")
    .forEach((input) => (input.disabled = false));
  document.querySelector("input#username").disabled = true;
  genderInput.disabled = false;
  joinDateInput.disabled = true;
  updateButton.innerText = "שמור פרטים";
  updateButton.setAttribute("type", "submit");
  updateButton.onclick = saveUpdate;
}

function validateInputs() {
  return (
    nameCheck(firstNameInput, lastNameInput, errorMsg) &&
    measurementsCheck(
      WeightInput,
      heightInput,
      waistInput,
      chestInput,
      armsInput,
      errorMsg
    ) &&
    checkDate(dobInput, errorMsg) &&
    checkUserName(userNameInput, errorMsg)
  );
}

async function saveUpdate(e) {
  e.preventDefault();
  if (!validateInputs()) {
    return;
  }

  const updatedUser = {
    username: userNameInput.value,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    birthday: dobInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    gender: genderInput.value,
  };

  const response = await fetch("http://localhost:3000/updateUser", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  const data = await response.json();
  alert(data.message);

  updateButton.innerText = "עדכן פרטים";
  document
    .querySelectorAll("form#personal-details input")
    .forEach((input) => (input.disabled = true));
  genderInput.disabled = true;
  updateButton.onclick = update;
}
//END UPDATE BUTTON FUNCTIONS//
updateButton.setAttribute("type", "submit");
updateButton.onclick = update;
newMeasurementButton.onclick = newMeasure;
//

//click on progress button
const progressButton = document.querySelector("#progressbutton");

progressButton.onclick = function (e) {
  e.preventDefault();
  window.location.replace("/progress");
};

//click on calculator button
const calculatorButton = document.querySelector("#calculatebutton");

calculatorButton.onclick = function (e) {
  e.preventDefault();
  window.location.replace("/Calculators");
};
