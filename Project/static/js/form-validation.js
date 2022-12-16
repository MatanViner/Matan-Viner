function checkIsNumber(input) {
  const checked = Number(input);
  return isNaN(checked);
}

export const nameCheck = function (firstNameInput, lastNameInput, errorMsg) {
  if (firstNameInput.value.length < 2 || lastNameInput.value < 2) {
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
  if (checkIsNumber(WeightInput.value) || WeightInput.value <= 0) {
    errorMsg("משקל אינו מספר תקין");
    return false;
  }
  if (checkIsNumber(heightInput.value) || heightInput.value <= 0) {
    errorMsg("גובה אינו מספר תקין");
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
