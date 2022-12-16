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

export const measurementsCheck = function (WeightInput, errorMsg) {
  if (checkIsNumber(WeightInput.value)) {
    errorMsg("משקל אינו מספר");
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
