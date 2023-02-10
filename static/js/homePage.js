const overlayHTML = `
  <div class="overlaye">
    <img src="/graphics/images/Icons/Logo.png" class="floating-img" alt="logo" />
    <div class="flier">
      <img src="/graphics/images/Icons/Flier.png" alt="logo" />
    </div>
    <h3>סטודיו לאימונים אישיים וקבוצתיים</h3>
    <p>
      סטודיו GetFit מתמחה במתן אימונים אישיים וקבוצתיים
      <br />
      באווירה ביתית חמה ומשפחתית אשר שם דגש בראש ובראשונה על הקשר עם המתאמנים.
    </p>
    <br/>
    <a id="joinNow" href="http://localhost:3000/register">
      <button class="yellowRainbow">הצטרפ/י עכשיו</button>
    </a>

    <a id="loginButton" href="http://localhost:3000/login">
      <button class="yellowRainbow">כניסה למערכת</button>
    </a>
    <a id="profileButton" href="http://localhost:3000/profile" class="hidden">
      <button class="yellowRainbow">כניסה לפרופיל</button>
    </a>
  </div>`;
const overlay = document.createElement("div");
overlay.innerHTML = overlayHTML;
header.appendChild(overlay);

if (currentUser) {
  const joinButton = document.getElementById("joinNow");
  const loginButton = document.getElementById("loginButton");
  const profileButton = document.getElementById("profileButton");
  const flier = document.querySelector("flier");

  if (joinButton) {
    joinButton.style.display = "none";
  }
  if (loginButton) {
    loginButton.style.display = "none";
  }
  if (profileButton) profileButton.style.display = "unset";
  if (flier) {
    flier.style.display = "none";
  }
}
//SLIDE SHOW CODE
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
