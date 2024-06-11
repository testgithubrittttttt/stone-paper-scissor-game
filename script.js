let userScore = 0;
let compScore = 0;
let countdownTimer;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const historyList = document.querySelector("#history-list");
const leaderboardList = document.querySelector("#leaderboard-list");
const achievementsList = document.querySelector("#achievements-list");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#computer-score");

const clickSound = document.querySelector("#click-sound");
const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");

const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;
const loginButton = document.querySelector("#login");
const shareScoreButton = document.querySelector("#share-score");
const tutorial = document.querySelector(".tutorial");
const closeTutorialButton = document.querySelector("#close-tutorial");
const achievementPopup = document.querySelector("#achievement-popup");
const achievementMsg = document.querySelector("#achievement-msg");
const closeAchievementButton = document.querySelector("#close-achievement");
const scoreModal = document.querySelector("#score-modal");
const closeScoreModalButton = document.querySelector("#close-score-modal");
const scoreText = document.querySelector("#score-text");
const copyScoreButton = document.querySelector("#copy-score");
const countdownElement = document.querySelector("#countdown");

themeToggle.addEventListener("click", () => {
    body.dataset.theme = body.dataset.theme === "dark" ? "" : "dark";
    themeToggle.innerText = body.dataset.theme === "dark" ? "🌞" : "🌙";
});

loginButton.addEventListener("click", () => {
    alert("User authentication is a placeholder.");
});

shareScoreButton.addEventListener("click", () => {
    scoreText.value = `Score: USER ${userScore} - COMPUTER ${compScore}`;
    scoreModal.style.display = "flex";
});

closeTutorialButton.addEventListener("click", () => {
    tutorial.style.display = "none";
});

closeAchievementButton.addEventListener("click", () => {
    achievementPopup.style.display = "none";
});

closeScoreModalButton.addEventListener("click", () => {
    scoreModal.style.display = "none";
});

copyScoreButton.addEventListener("click", () => {
    scoreText.select();
    document.execCommand("copy");
    alert("Score copied to clipboard!");
});

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "It's a Draw! Try again.";
    msg.style.backgroundColor = "var(--msg-background)";
    drawSound.play();
    addHistory("Draw");
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! ${capitalize(userChoice)} beats ${capitalize(compChoice)}`;
        msg.style.backgroundColor = "rgba(76, 175, 80, 0.8)";
        winSound.play();
        addHistory(`Win - ${capitalize(userChoice)} beats ${capitalize(compChoice)}`);
        checkAchievements();
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! ${capitalize(compChoice)} beats ${capitalize(userChoice)}`;
        msg.style.backgroundColor = "rgba(244, 67, 54, 0.8)";
        loseSound.play();
        addHistory(`Loss - ${capitalize(compChoice)} beats ${capitalize(userChoice)}`);
    }
};

const playGame = (userChoice) => {
    clickSound.play();
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

const addHistory = (result) => {
    const li = document.createElement("li");
    li.innerText = result;
    historyList.appendChild(li);
};

const checkAchievements = () => {
    let achievement = "";
    if (userScore === 5) {
        achievement = "5 Wins - Good Start!";
    } else if (userScore === 10) {
        achievement = "10 Wins - Getting Better!";
    } else if (userScore === 20) {
        achievement = "20 Wins - Master Player!";
    }
    if (achievement) {
        addAchievement(achievement);
        achievementMsg.innerText = achievement;
        achievementPopup.style.display = "block";
    }
};

const addAchievement = (achievement) => {
    const li = document.createElement("li");
    li.innerText = achievement;
    achievementsList.appendChild(li);
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        startCountdown(() => {
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        });
    });
});

const startCountdown = (callback) => {
    let countdown = 3;
    countdownElement.innerText = countdown;
    countdownElement.style.display = "block";
    countdownTimer = setInterval(() => {
        countdown--;
        countdownElement.innerText = countdown;
        if (countdown === 0) {
            clearInterval(countdownTimer);
            countdownElement.style.display = "none";
            callback();
        }
    }, 1000);
};
