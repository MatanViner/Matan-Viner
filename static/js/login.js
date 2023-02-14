const params = new URLSearchParams(window.location.search);
const from = params.get("from");
const incorrect = params.get("incorrect");
document.getElementById("from").value = from;

let msg = "";
if (from === "profile") {
  msg = "כדי לצפות בפרופיל נדרש להתחבר קודם לאתר";
} else if (from === "calculator") {
  msg = "כדי להשתמש במחשבונים ולצפות בהמלצות נדרש להתחבר קודם לאתר";
} else if (from === "progress") {
  msg = "כדי לצפות בהתקדמות נדרש להתחבר קודם לאתר";
} else if (from === "payment") {
  msg = "הרשמתך התקבלה! התחבר/י למערכת";
}

if (incorrect === "true") {
  msg = "שם משתמש ו/או סיסמא אינם נכונים. ";
}

if (msg) {
  const msgContainer = document.getElementById("fromMsg");
  msgContainer.innerText = msg; ///
  msgContainer.style.display = "unset";
}
const loginButton = document.querySelector("form button");

// loginButton.onclick = function (e) {

//   if (from === "profile") {
//     window.location.replace("/profile");
//   } else if (from === "calculator") {
//     window.location.replace("/calculators");
//   } else if (from === "progress") {
//     window.location.replace("/progress");
//   } else {
//     window.location.replace("/");
//   }
// };
