export function checkIsNumber(input) {
  const checked = Number(input);
  return isNaN(checked);
}

export const nameCheck = function (firstNameInput, lastNameInput, errorMsg) {
  if (firstNameInput.value.length < 2 || lastNameInput.value.length < 2) {
    errorMsg("בחר שם/שם משפחה שמכיל יותר מאות אחת.");
    return false;
  }
  if (
    !checkIsNumber(firstNameInput.value) ||
    !checkIsNumber(lastNameInput.value)
  ) {
    errorMsg("שם פרטי/משפחה מכיל מספרים.");
    return false;
  }
  return true;
};

export const measurementsCheck = function (
  WeightInput,
  heightInput,
  waistInput,
  chestInput,
  armsInput,
  errorMsg
) {
  if (
    checkIsNumber(WeightInput.value) ||
    WeightInput.value < 20 ||
    WeightInput.value > 500
  ) {
    errorMsg("משקל אינו מספר תקין -אנא בחר משקל של לפחות 20 קילו עד חצי טון. ");
    return false;
  }
  if (
    checkIsNumber(heightInput.value) ||
    heightInput.value < 50 ||
    heightInput.value > 250
  ) {
    errorMsg(
      "ועד גובה אינו מספר תקין - אנא בחר גובה  של לפחות חצי מטר עד 2.5 מטר)."
    );
    return false;
  }
  if (waistInput === 1) {
    return true;
  } //when registed

  //when adding new measures
  if (checkIsNumber(waistInput.value) || waistInput.value < 0) {
    errorMsg("היקף המותן אינו מספר תקין");
    return false;
  }
  if (checkIsNumber(chestInput.value) || chestInput.value < 0) {
    errorMsg("היקף החזה אינו מספר תקין");
    return false;
  }
  if (checkIsNumber(armsInput.value) || armsInput.value < 0) {
    errorMsg("היקף הזרועות אינו מספר תקין");
    return false;
  }
  return true;
};

export const checkDate = function (dobInput, errorMsg) {
  const age =
    (new Date() - new Date(dobInput.value)) / (1000 * 60 * 60 * 24 * 365);
  if (age < 10) {
    errorMsg("ההרשמה היא מגיל 10.");
    return false;
  }
  return true;
};

export const checkUserName = function (userNameInput, errorMsg) {
  if (userNameInput.value.length <= 2) {
    errorMsg("בחר שם משתמש שמכיל יותר משני אותיות.");
    return false;
  }
  return true;
};

export function validatePhone(e) {
  if (e.target.value.length === 3 && e.inputType !== "deleteContentBackward") {
    e.target.value += "-";
  }
  if (e.target.value.length > 11) {
    errorMsg("אורך מס' טלפון הוא עד 11 תווים.");
  } else {
    const alertContainer = document.getElementById("alert");
    alertContainer.style.opacity = "0";
  }
}
