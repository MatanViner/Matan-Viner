//GENDERS
const FEMALE = "נקבה";
const MALE = "זכר";

class Customer {
  constructor({
    username,
    password,
    firstName,
    lastName,
    gender,
    dob,
    phone,
    email,
    measurements,
  }) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.dob = dob;

    this.phone = phone;
    this.email = email;
    this.JoinDate = Date();
    if (!measurements[0].height || !measurements[0].weight) {
      throw new Error("Missing data");
    }
    this.measurements = measurements;
  }

  getAge() {
    return (new Date() - new Date(this.dob)) / (1000 * 60 * 60 * 24 * 365);
  }

  getCurrentBMR() {
    return getBMR(this.measurements.at(-1), this.getAge(), this.gender);
  }
}

//CREATE EXAMPLE USER WITH EXAMPLE DATA
const exampleUser = new Customer({
  username: "Matan",
  password: "123456",
  firstName: "מתן",
  lastName: "וינר",
  gender: MALE,
  dob: "2000-08-13",
  phone: "052-8816615",
  joinDate: new Date(),
  email: "matanvi@post.bgu.ac.il",
  measurements: [
    {
      date: new Date("2022-11-01").getTime(),
      height: 182,
      chest: 100,
      arms: 102,
      waist: 115,
      weight: 100,
    },
    {
      date: new Date("2022-12-01").getTime(),
      height: 182,
      chest: 100,
      arms: 102,
      waist: 115,
      weight: 96,
    },
    {
      date: new Date().getTime(),
      height: 182,
      chest: 120,
      arms: 132,
      waist: 105,
      weight: 92,
    },
  ],
});
//adding the example user to the local storage:
const users = JSON.parse(localStorage.getItem("users") || "[]");
if (users.length === 0) {
  users[0] = exampleUser;
  localStorage.setItem("users", JSON.stringify(users));
}

function getBMI(measurement) {
  return (measurement.weight / measurement.height / measurement.height) * 10000;
}

function getBMR(measurement, age, gender) {
  if (gender === FEMALE) {
    return (
      655.1 +
      9.563 * measurement.weight +
      1.85 * measurement.height -
      4.676 * age
    );
  } else
    return (
      66.47 +
      13.75 * measurement.weight +
      5.003 * measurement.height -
      6.755 * age
    );
}

function getBodyFat(measurement, age, gender) {
  let genderParameter = 0;
  if (gender === MALE) {
    genderParameter = 1;
  }
  if (age < 15) {
    //children formula
    return 1.51 * getBMI(measurement) - 0.7 * age - 3.6 * genderParameter + 1.4;
  } else {
    //adult formula
    return (
      1.2 * getBMI(measurement) + 0.23 * age - (10.8 * genderParameter + 1.4)
    );
  }
}

//REPEATING ELEMENTS IN PAGES
//FOOTER HTML
const footerHtml = `<footer class="footer">
<div class="footer__addr">
  <h1 class="footer__logo">Get Fit</h1>
  <img class="footer_img" src="/static/images/Logo.png" alt="logo" />

  <h2>צור קשר</h2>

  <address>
    גפן 2, באר שבע 8425314<br />

    <a class="footer__btn" href="mailto:matanvi@post.bgu.ac.il"
      >שלח מייל</a
    >
  </address>
</div>

<ul class="footer__nav">
  <li class="nav__item">
    <h2 class="nav__title">החשבון שלי</h2>

    <ul class="nav__ul">
      <li>
        <a href="/views/profile.html">פרופיל</a>
      </li>
      <li>
        <a href="/views/Calculators.html">מחשבונים</a>
      </li>

      <li>
        <a href="/views/progress.html">התקדמות</a>
      </li>
    </ul>
  </li>

  <li class="nav__item nav__item">
    <h2 class="nav__title">אודות</h2>

    <ul class="nav__ul nav__ul">
      <li>
        <a href="/views/index.html">דף הבית</a>
      </li>
      <li>
        <a href="/views/about.html">אודותינו</a>
      </li>
      <li>
        <a href="/static/files/takanon.pdf" target="_blank">התקנון </a>
      </li>
      <li>
        <a href="/views/Contact.html">צור קשר</a>
      </li>
    </ul>
  </li>

  <li class="nav__item">
    <h2 id="registerTitle" class="nav__title">הרשמה</h2>
    <ul class="nav__ul">
      <li id="registerButton">
        <a class="footer__btn" href="/views/register.html">הרשמה</a>
      </li>
      <li id="logoutButton" class="hidden">
        <a class="footer__btn" href="/views/index.html">התנתק</a>
      </li>
    </ul>
  </li>
  <ul class="socialMedia">
    <a href="https://www.facebook.com/GetFitTrainers" target="_blank">
      <img
        src="/static/images/facebook.png"
        class="floating-img"
        alt="facebook"
      />
    </a>
    <a href="https://www.instagram.com/getfit.b7/" target="_blank">
      <img
        src="/static/images/IG.png"
        class="floating-img"
        alt="instagram"
      />
    </a>
  </ul>
</ul>
<div class="legal">
  <p>&copy; 2022 קורס פיתוח WEB - אוניברסיטת בן גוריון.</p>
</div>
</footer>`;
//END

//HEADER & NAV BAR HTML
const headerHTML = `
    <header>
      <nav class="redRainbow">
        <h1 class="logo">Get Fit</h1>
        <ul class="main-nav">
          <li><a href="/views/index.html">דף הבית</a></li>
          <li><a href="/views/about.html">אודות</a></li>
          <li id="loginLink"><a href="/views/login.html">כניסה</a></li>
          <li id="registerLink"><a href="/views/register.html">הצטרפות</a></li>
          <li><a href="/views/calculators.html">מחשבונים</a></li>
          <li><a href="/views/progress.html">התהליך שלי</a></li>
          <li><a href="/views/contact.html">צור קשר</a></li>
          <li class="hidden" id="logoutlink"><a href="/views/index.html">התנתק</a></li>
        </ul>
      </nav>
    </header>
`;
//END

//CREATING HTML ELEMENTS
const header = document.createElement("header");
const footer = document.createElement("footer");
footer.innerHTML = footerHtml;
header.innerHTML = headerHTML;

// document.header.appendChild(header);
document.body.insertBefore(header, document.body.firstChild);
document.body.appendChild(footer);
//END

//CHANGING FOOTER & NAV IF USER IS LOGGED IN
if (localStorage.getItem("currentUser")) {
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const logoutLink = document.getElementById("logoutlink");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  registerButton.style.display = "none";
  registerLink.style.display = "none";
  logoutButton.style.display = "unset";
  loginLink.style.display = "none";
  logoutLink.style.display = "unset";
  logoutButton.onclick = logout;
  logoutLink.onclick = logoutButton.onclick;
}

function logout() {
  const logoutButton = document.getElementById("logoutButton");
  const logoutLink = document.getElementById("logoutlink");
  logoutLink.style.display = "none";
  logoutButton.style.display = "none";
  localStorage.removeItem("currentUser");
  window.location.replace("/views/index.html");
}
//END

//ERROR MESSAGES
var close = document.querySelector(".closebtn");
const alertContainer = document.getElementById("alert");

if (close) {
  close.onclick = function () {
    alertContainer.style.opacity = "0";
    setTimeout(function () {
      alertContainer.style.display = "none";
    }, 600);
  };
}
function errorMsg(msg) {
  alertContainer.style.opacity = "1";
  const errorMessageContainer = document.getElementById("msg");
  errorMessageContainer.innerText = msg;
  alertContainer.style.display = "flex";
  alertContainer.style.width = "100%";
}
//END

//ADDING ICON TO ALL PAGES
var iconlink = document.createElement("link");
iconlink.rel = "icon";
iconlink.type = "image/x-icon";
iconlink.href = "/static/images/Logo.png";
document.head.appendChild(iconlink);

//HELPFUL FUNCTIONS
function checkForNums(input) {
  return (result = /^\d+$/.test(input));
}

function checkIsNumber(input) {
  const checked = Number(input);
  return isNaN(checked);
}

//END
