export default function setupDSALevels() {
  const levelData = [
    { name: "Arrays Mastery", image: "/public/images/arrays.png" },
    { name: "String Manipulation", image: "/public/images/strings.png" },
    { name: "Linked List Logic", image: "/public/images/linkedlist.png" },
    { name: "Stacks & Queues", image: "/public/images/stack.png" },
    { name: "Sorting Techniques", image: "/public/images/sorting.png" },
    { name: "Search Strategies", image: "/public/images/searching.png" },
    { name: "Tree Traversals", image: "/public/images/trees.png" },
    { name: "Graph Explorers", image: "/public/images/graphs.png" },
    { name: "Hashing Hacks", image: "/public/images/hashmap.png" },
    { name: "Recursive Thinking", image: "/public/images/recursion.png" },
    { name: "Dynamic Programming", image: "/public/images/dynamic-programming.png" },
    { name: "Greedy Algorithms", image: "/public/images/greedy-algo.png" }
  ];

  const grid = document.getElementById("levels-grid");
  grid.innerHTML = ""; 

  const stars = JSON.parse(localStorage.getItem("stars") || "{}");
  const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;
  const coinCountElem = document.getElementById("coin-count");

  let coins = parseInt(localStorage.getItem("coins")) || 0;
  coinCountElem.textContent = coins;

  levelData.forEach((level, index) => {
    const levelNum = index + 1;
    const isUnlocked = levelNum <= unlockedLevel;
    const starsEarned = stars[levelNum] || 0;

    const card = document.createElement("div");
    card.className = `level-card ${isUnlocked ? "" : "locked"}`;

    if (isUnlocked) {
      card.style.cursor = "pointer";
      card.onclick = () => {
        window.location.href = `DSA-quiz-level${levelNum}.html`;
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

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your progress?")) {
      localStorage.removeItem("stars");
      localStorage.setItem("unlockedLevel", "1");
      localStorage.setItem("coins", "0");  
      location.reload();
    }
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back();
  });
}
