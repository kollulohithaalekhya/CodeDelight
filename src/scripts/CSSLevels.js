// src/scripts/cssLevels.js

const levelData = [
  { id: 1, name: "Easy", image: "/public/images/css-easy.png" },
  { id: 2, name: "Medium", image: "/public/images/css-medium.png" },
  { id: 3, name: "Hard", image: "/public/images/css-hard.png" },
];

export function getLevels() {
  const stars = JSON.parse(localStorage.getItem("stars") || "{}");
  const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;
  const coins = parseInt(localStorage.getItem("coins")) || 0;

  const levels = levelData.map((level) => {
    const isUnlocked = level.id <= unlockedLevel;
    return {
      ...level,
      unlocked: isUnlocked,
      stars: stars[level.id] || 0,
    };
  });

  return { coins, levels };
}

export function resetProgress() {
  localStorage.removeItem("stars");
  localStorage.setItem("unlockedLevel", "1");
  localStorage.setItem("coins", "0");

  return getLevels();
}

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
  }
}
