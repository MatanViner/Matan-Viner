setTimeout(() => {
  const params = new URLSearchParams(window.location.search);
  const success = params.get("success");
  if (success) {
    alert("הטופס נשלח בהצלחה");
  }
}, 500);

const nameInput = document.getElementById("name_input");
const phoneInput = document.getElementById("telephone_input");
const subject = document.getElementById("subject_input");
const form = document.querySelector("form");
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

const validation = function () {
  if (nameInput.value.length < 2 || /[0-9]/.test(nameInput.value)) {
    errorMsg("אנא השאר לנו שם תקין.");
    return false;
  } else if (phoneInput.value.length > 11) {
    errorMsg("אנא השאר לנו מספר טלפון תקין עם 11 תווים.");
    return false;
  } else {
    return true;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid = validation();
  if (!isValid) {
    return;
  }
  form.submit();
});
