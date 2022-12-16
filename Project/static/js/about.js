const overlayHTML = '<div class="overlaye"><h1>אודותניו</h1></div>';
header.innerHTML += overlayHTML;

const userJson = localStorage.getItem("currentUser");
if (userJson) {
  const joinNowButton = document.getElementById("joinNowButton");
  joinNowButton.innerText = "צפו בשינוי שלכם!";
  joinNowButton.href = "/views/progress.html";
  joinNowButton.className = "button-primary redRainbow floating-img";
}
