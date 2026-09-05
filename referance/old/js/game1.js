const fallArea       = document.getElementById("fallArea");
const stackBox       = document.getElementById("stackBox");
const resultText     = document.getElementById("resultText");
const targetDisplay  = document.getElementById("targetAnswer");
const coinDisplay    = document.getElementById("coinDisplay");


let coins = parseInt(localStorage.getItem("coins")) || 100;
coinDisplay.textContent = coins;


let puzzles        = [[5, 3, 2], [4, 1, 7, 3], [2, 2, 1]];
let currentPuzzle  = 0;
let targetAnswer   = puzzles[currentPuzzle];
let stack          = [];
let result         = [];


targetDisplay.textContent = targetAnswer.join(" ");
coinDisplay.textContent = coins;


setInterval(dropNumber, 2000);

function dropNumber() {
  const number = getRandomNumber();
  const block = document.createElement("div");
  block.className = "letter";
  block.textContent = number;
  fallArea.appendChild(block);

  block.onclick = () => {
    stack.push(number);
    updateStackBox();
    block.remove();
  };

  setTimeout(() => {
    if (block.parentNode) block.remove();
  }, 4000);
}

function getRandomNumber() {
  return targetAnswer[Math.floor(Math.random() * targetAnswer.length)];
}

function updateStackBox() {
  stackBox.innerHTML = "";
  stack.forEach(num => {
    const div = document.createElement("div");
    div.className = "stack-item";
    div.textContent = num;
    stackBox.appendChild(div);
  });
}

function popStack() {
  if (stack.length > 0) {
    const popped = stack.pop();
    result.push(popped);
    updateStackBox();
    updateResultBox();
  }
}

function updateResultBox() {
  resultText.textContent = result.length > 0 ? result.join(" ") : "_ ".repeat(targetAnswer.length).trim();
}

function checkResult() {
  if (arraysEqual(result, targetAnswer)) {
    coins += 5; 
    localStorage.setItem("coins", coins); 
    coinDisplay.textContent = coins;

    if (currentPuzzle === puzzles.length - 1) {
      alert("🎉 You completed all puzzles! +5 coins");
    } else {
      alert("✅ Correct! +5 coins");
    }

    setTimeout(() => {
      window.location.href = "../html/funzone.html"; 
    }, 100);
  } else {
    alert("❌ Incorrect! Try again.");

    
    setTimeout(() => {
      window.location.href = "../html/funzone.html"; 
    }, 100);
  }
}


function nextPuzzle() {
  targetAnswer = puzzles[currentPuzzle];
  stack = [];
  result = [];
  targetDisplay.textContent = targetAnswer.join(" ");
  updateStackBox();
  updateResultBox();
}

function useHint() {
  if (coins >= 2) {
    coins -= 2;
    localStorage.setItem("coins", coins);
    const hintIndex = result.length;
    alert(`💡 Hint: Next number should be ${targetAnswer[hintIndex]}`);
    coinDisplay.textContent = coins;
  } else {
    alert("❌ Not enough coins for a hint (need 2)");
  }
}

function skipPuzzle() {
  if (coins >= 5) {
    coins -= 5;
    localStorage.setItem("coins", coins);
    currentPuzzle = (currentPuzzle + 1) % puzzles.length;
    alert("⏭️ Skipped to next puzzle!");
    coinDisplay.textContent = coins;
    nextPuzzle();
  } else {
    alert("❌ Need 5 coins to skip!");
  }
}
function resetPuzzle() {
  stack = [];
  result = [];
  updateStackBox();
  updateResultBox();
}


function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}
localStorage.setItem("rewardCoins", "5");
