const overlayHTML = '<div class="overlaye"><h1>אודותניו</h1></div>';
const overlay = document.createElement("div");
overlay.innerHTML = overlayHTML;
header.appendChild(overlay);

const userJson = localStorage.getItem("currentUser");
if (userJson) {
  const joinNowButton = document.getElementById("joinNowButton");
  joinNowButton.style.display = "none";
}
