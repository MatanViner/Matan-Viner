const params = new URLSearchParams(window.location.search);
const from = params.get("from");

let msg = "";
if (from === "profile") {
  msg = "כדי לצפות בפרופיל התחבר/י קודם לאתר";
} else if (from === "calculator") {
  msg = "כדי להשתמש במחשבונים יש להתחבר לאתר";
} else if (from === "progress") {
  msg = "כדי לצפות בהתקדמות יש להתחבר קודם לאתר";
} else if (from === "payment") {
  msg = "הרשמתך התקבלה! התחבר/י למערכת";
}

if (msg) {
  const msgContainer = document.getElementById("msg");
  msgContainer.innerText = msg; /// <div>asdad </div>
  msgContainer.style.display = "unset";
}
const loginButton = document.querySelector("form button");

loginButton.onclick = function (e) {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector('form input[type="password"]').value;

  const users = JSON.parse(localStorage.getItem("users"));

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    alert("úser not found");
    return;
  }
  //adding user to the local storage
  localStorage.setItem("currentUser", JSON.stringify(user));
  //opening the user profile
  if (from === "profile") {
    window.location.replace("/views/profile.html");
  }
  if (from === "calculator") {
    window.location.replace("/views/calculators.html");
  }
  if (from === "progress") {
    window.location.replace("/views/progress.html");
  } else {
    window.location.replace("/views/index.html");
  }
};
