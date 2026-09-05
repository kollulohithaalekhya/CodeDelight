let coins = parseInt(localStorage.getItem('coins')) || 100;
const coinDisplayElements = document.querySelectorAll("#coinDisplay");
function updateCoinDisplays() {
  coinDisplayElements.forEach(el => el.textContent = coins);
}
updateCoinDisplays();
function playGame(gameUrl, cost) {
  if (coins >= cost) {
    coins -= cost;
    localStorage.setItem("coins", coins);
    updateCoinDisplays();
    alert(`✅ You spent ${cost} coins! Starting game...`);
    window.location.href = gameUrl;
  } else {
    alert("❌ Not enough coins to play this game.");
  }
}
