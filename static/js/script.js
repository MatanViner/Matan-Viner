//GENDERS
const FEMALE = "אישה";
const MALE = "גבר";
const OTHER = "אחר";

class Customer {
  constructor({
    username,
    password,
    firstName,
    lastName,
    gender,
    birthday,
    phone,
    email,
    joinDate,
    measures,
  }) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthday = birthday;
    this.phone = phone;
    this.email = email;
    this.joinDate = joinDate;
    this.measures = measures;
  }

  setMeasures() {
    this.measures = this.measures;
  }
  getAge() {
    const today = new Date();
    const birthdated = new Date(this.birthday);
    const age = (today - birthdated) / (1000 * 60 * 60 * 24 * 365);
    console.log(age);
    return age;
  }

  getCurrentBMR() {
    return getBMR(this.measures.at(-1), this.getAge(), this.gender);
  }
}

function getBMI(measures) {
  return measures.weight / (measures.height / 100) ** 2;
}

function getBMR(measures, age, gender) {
  if (gender === FEMALE) {
    return (
      655.1 + 9.563 * measures.weight + 1.85 * measures.height - 4.676 * age
    );
  } else
    return (
      66.47 + 13.75 * measures.weight + 5.003 * measures.height - 6.755 * age
    );
}

function getBodyFat(measures, age, gender) {
  let genderParameter = 0;
  if (gender === MALE) {
    genderParameter = 1;
  }
  if (age < 15) {
    //children formula
    return 1.51 * getBMI(measures) - 0.7 * age - 4.6 * genderParameter + 1.4;
  } else {
    //adult formula
    return 1.2 * getBMI(measures) + 0.23 * age - (11.8 * genderParameter + 1.4);
  }
}

//REPEATING ELEMENTS IN PAGES
//FOOTER HTML
const footerHtml = `<footer class="footer">
<div class="footer__addr">
  <h1 class="footer__logo">Get Fit</h1>
  <img class="footer_img" src="../graphics/images/Icons/Logo.png" alt="logo" />

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
        <a href="http://localhost:3000/profile">פרופיל</a>
      </li>
      <li>
        <a href="http://localhost:3000/calculators">מחשבונים והמלצות</a>
      </li>

      <li>
        <a href="http://localhost:3000/progress">התהליך שלי</a>
      </li>
    </ul>
  </li>

  <li class="nav__item nav__item">
    <h2 class="nav__title">אודות</h2>

    <ul class="nav__ul nav__ul">
      <li>
        <a href="http://localhost:3000/home">דף הבית</a>
      </li>
      <li>
        <a href="http://localhost:3000/about">אודות</a>
      </li>
      <li>
        <a href="../graphics/files/takanon.pdf" target="_blank">התקנון </a>
      </li>
      <li>
        <a href="http://localhost:3000/contact">צור קשר</a>
      </li>
    </ul>
  </li>

  <li class="nav__item">
    <h2 id="registerTitle" class="nav__title">הרשמה</h2>
    <ul class="nav__ul">
      <li id="registerButton">
        <a class="footer__btn" href="http://localhost:3000/register">הרשמה</a>
      </li>
      <li id="logoutButton" class="hidden">
        <a class="footer__btn" href="http://localhost:3000/logout">התנתק</a>
      </li>
    </ul>
  </li>
  <ul class="socialMedia">
    <a href="https://www.facebook.com/GetFitTrainers" target="_blank">
      <img
        src="../graphics/images/Icons/facebook.png"
        class="floating-img"
        alt="facebook"
      />
    </a>
    <a href="https://www.instagram.com/getfit.b7/" target="_blank">
      <img
        src="../graphics/images/Icons/IG.png"
        class="floating-img"
        alt="instagram"
      />
    </a>
  </ul>
</ul>
<div class="legal">
  <p>&copy; 2023 קורס פיתוח WEB - אוניברסיטת בן גוריון.</p>
</div>
</footer>`;
//END

//HEADER & NAV BAR HTML
const headerHTML = `
    <header>
      <nav class="redRainbow">
        <h1 class="logo">Get Fit</h1>
        <ul class="main-nav">
          <li><a href="http://localhost:3000/home">דף הבית</a></li>
          <li><a href="http://localhost:3000/about">אודות</a></li>
          <li id="loginLink"><a href="http://localhost:3000/login">כניסה</a></li>
          <li><a href="http://localhost:3000/profile">פרופיל</a></li>
          <li id="registerLink"><a href="http://localhost:3000/register">הצטרפות</a></li>
          <li><a href="http://localhost:3000/calculators">מחשבונים והמלצות</a></li>
          <li><a href="http://localhost:3000/progress">התהליך שלי</a></li>
          <li><a href="http://localhost:3000/contact">צור קשר</a></li>
          <li class="hidden" id="logoutlink" ><a  >התנתק</a></li>
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

function logout() {
  fetch("http://localhost:3000/logout").then((res) => {
    if (res.status === 200) {
      window.location.href = "http://localhost:3000/home";
    }
  });
}

//CHANGING FOOTER & NAV IF USER IS LOGGED IN
if (currentUser) {
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
  logoutLink.onclick = logout;
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

//ACTIVE NAV BAR//
var activePage = window.location.pathname;
document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.style.color = "white";
  }
});

document.querySelectorAll("footer a").forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.style.color = "rgb(255, 210, 32)";
  }
});

//ADDING ICON TO ALL PAGES
var iconlink = document.createElement("link");
iconlink.rel = "icon";
iconlink.type = "image/x-icon";
iconlink.href = "../graphics/images/Icons/Logo.png";
document.head.appendChild(iconlink);

//HELPFUL FUNCTIONS
function checkForNums(input) {
  return (result = /^\d+$/.test(input));
}

//END
