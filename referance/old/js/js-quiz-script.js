let current = 0, score = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question-text").innerText = `${current + 1}. ${q.question}`;
  const form = document.getElementById("options-form");
  form.innerHTML = "";
  q.options.forEach((opt, index) => {
    const option = document.createElement("label");
    option.className = "option";
    option.innerHTML = `
      <input type="radio" name="option" value="${index}" />
      ${opt}
    `;
    form.appendChild(option);
  });
  updateProgressBar();
}

function updateProgressBar() {
  const fill = document.getElementById("progress-bar-fill");
  const percent = (current / questions.length) * 100;
  fill.style.width = `${percent}%`;
}

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option.");
    return;
  }
  if (parseInt(selected.value) === questions[current].answer) {
    score++;
  }
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    updateProgressBar();
    showResult();
  }
}

function showResult() {
  const resultDiv = document.getElementById("result");
  document.querySelector(".submit-btn").style.display = "none";
  document.getElementById("question-text").style.display = "none";
  document.getElementById("options-form").style.display = "none";

  let starsEarned = 0;
  if (score >= 18) starsEarned = 3;
  else if (score >= 14) starsEarned = 2;
  else if (score >= 7) starsEarned = 1;

  if (starsEarned > 0) {
    let starsHtml = '<div class="stars">';
    for (let i = 1; i <= 3; i++) {
      starsHtml += `<span class="star${i <= starsEarned ? ' filled' : ''}">&#9733;</span>`;
    }
    starsHtml += '</div>';

    const coinsEarned = starsEarned * coinsPerStar;
    let totalCoins = parseInt(localStorage.getItem("coins") || "0");
    totalCoins += coinsEarned;
    localStorage.setItem("coins", totalCoins.toString());

    resultDiv.innerHTML = `
        <i class="fas fa-check-circle pass-icon" style="font-size:40px;"></i>
        <h2 class="pass-heading">Great Job!</h2>
        <p class="score-text">You passed! Score: ${score}/${questions.length}</p>
        ${starsHtml}
        <p style="margin-top: 15px; font-weight: 600; color: #00f2fe;">
          Coins earned: ${coinsEarned}
        </p>
    `;

    completeLevel(levelNum, starsEarned);
  } else {
    resultDiv.innerHTML = `
        <i class="fas fa-times-circle fail-icon" style="font-size:40px;"></i>
        <h2 class="fail-heading">Try Again!</h2>
        <p class="score-text">You scored ${score}/${questions.length}.</p>
    `;
  }

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";
  okBtn.className = "ok-btn";
  okBtn.onclick = () => window.location.href = "js-levels.html";
  resultDiv.appendChild(okBtn);
}

function completeLevel(levelNum, starsEarned) {
  const totalLevels = 3;
  localStorage.setItem(`level${levelNum}`, JSON.stringify({ unlocked: true, stars: starsEarned }));

  const starData = JSON.parse(localStorage.getItem("stars") || "{}");
  if (!starData[levelNum] || starData[levelNum] < starsEarned) {
    starData[levelNum] = starsEarned;
    localStorage.setItem("stars", JSON.stringify(starData));
  }

  const currentUnlocked = parseInt(localStorage.getItem("unlockedLevel")) || 1;
  if (starsEarned >= 1 && levelNum + 1 > currentUnlocked) {
    localStorage.setItem("unlockedLevel", levelNum + 1);
  }
}


window.addEventListener("DOMContentLoaded", loadQuestion);
