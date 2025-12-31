export function renderHTMLLevels(setCoins) {
  const levelData = [
    { name: "Easy", image: "/public/images/html-easy.png" },
    { name: "Medium", image: "/public/images/html-medium.png" },
    { name: "Hard", image: "/public/images/html-hard.png" },
  ];

  const grid = document.getElementById("levels-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const stars = JSON.parse(localStorage.getItem("stars") || "{}");
  const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;

  let coins = parseInt(localStorage.getItem("coins")) || 0;
  setCoins(coins);

  levelData.forEach((level, index) => {
    const levelNum = index + 1;
    const isUnlocked = levelNum <= unlockedLevel;
    const starsEarned = stars[levelNum] || 0;

    const card = document.createElement("div");
    card.className = `level-card ${isUnlocked ? "" : "locked"}`;

    if (isUnlocked) {
      card.style.cursor = "pointer";
      card.onclick = () => {
        window.location.href = `HTML-quiz-level${levelNum}.html`;
      };
    }

    const img = document.createElement("img");
    img.src = level.image;
    img.alt = level.name;
    img.className = "level-img";

    const title = document.createElement("div");
    title.className = "level-title";
    title.textContent = `Level ${levelNum}: ${level.name}`;

    const starsDiv = document.createElement("div");
    starsDiv.className = "star-container";
    for (let i = 0; i < 3; i++) {
      const star = document.createElement("span");
      star.className = "star";
      if (i < starsEarned) {
        star.textContent = "★";
        star.classList.add("filled");
      } else {
        star.textContent = "☆";
        star.classList.add("empty");
      }
      starsDiv.appendChild(star);
    }

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(starsDiv);

    if (!isUnlocked) {
      const lock = document.createElement("div");
      lock.className = "lock-icon";
      lock.textContent = "🔒";
      card.appendChild(lock);
    }

    grid.appendChild(card);
  });
}

//  Called after each quiz to update stars & coins
export function completeLevel(levelNum, starsEarned) {
  const starData = JSON.parse(localStorage.getItem("stars") || "{}");
  if (!starData[levelNum] || starData[levelNum] < starsEarned) {
    starData[levelNum] = starsEarned;
    localStorage.setItem("stars", JSON.stringify(starData));
  }

  const currentUnlocked = parseInt(localStorage.getItem("unlockedLevel")) || 1;
  if (starsEarned >= 1 && levelNum + 1 > currentUnlocked) {
    localStorage.setItem("unlockedLevel", levelNum + 1);
  }

  if (starsEarned > 0) {
    let coins = parseInt(localStorage.getItem("coins")) || 0;
    coins += starsEarned * 5; 
    localStorage.setItem("coins", coins.toString());

    const coinCountElem = document.getElementById("coin-count");
    if (coinCountElem) {
      coinCountElem.textContent = coins;
    }
  }
}
