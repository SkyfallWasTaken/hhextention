let timer;
let notificationTimer;
let timerDisplay = document.getElementById('timer-display');
let startButton = document.getElementById('start-button');
let endButton = document.getElementById('end-button');
let historyList = document.getElementById('history-list');
let homePage = document.getElementById('home-page');
let historyPage = document.getElementById('history-page');
let appearancePage = document.getElementById('appearance-page');
let startTime;

function showHome() {
    homePage.style.display = 'block';
    historyPage.style.display = 'none';
    appearancePage.style.display = 'none';
}

function showHistory() {
    homePage.style.display = 'none';
    historyPage.style.display = 'block';
    appearancePage.style.display = 'none';
}

function showAppearance() {
    homePage.style.display = 'none';
    historyPage.style.display = 'none';
    appearancePage.style.display = 'block';
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
}

function setDarkMode() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
}

function sendNotification() {
    if (Notification.permission === "granted") {
        new Notification("Time check", { body: "15 minutes have passed!" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Time check", { body: "15 minutes have passed!" });
            }
        });
    }
}

function startTimer() {
    let duration = parseInt(timerDisplay.textContent.split(":")[0]) * 60; // convert minutes to seconds
    startTime = Date.now();
    startButton.disabled = true;
    endButton.disabled = false;

    const topic = document.getElementById('coding-topic').value || 'No topic entered';

    timer = setInterval(() => {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        let remainingTime = duration - elapsedTime;

        if (remainingTime <= 0) {
            clearInterval(timer);
            clearInterval(notificationTimer);
            timerDisplay.textContent = "00:00";
            alert("Time's up!");
            logTime(duration);
            startButton.disabled = false;
            endButton.disabled = true;
        } else {
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);

    notificationTimer = setInterval(sendNotification, 15 * 60 * 1000); // 15 minutes
}

function endTimer() {
    clearInterval(timer);
    clearInterval(notificationTimer);

    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    logTime(elapsedTime);
    timerDisplay.textContent = "60:00";
    startButton.disabled = false;
    endButton.disabled = true;
}

function logTime(elapsedTime) {
    let topic = document.getElementById('coding-topic').value || 'No topic entered';
    let minutes = Math.floor(elapsedTime / 60);
    let logEntry = document.createElement('li');
    logEntry.textContent = `Spent ${minutes} minutes coding on: ${topic}`;
    historyList.appendChild(logEntry);
}

startButton.addEventListener('click', startTimer);
endButton.addEventListener('click', endTimer);
