let timer;
let notificationTimer;
let timerDisplay = document.getElementById('timer-display');
let startButton = document.getElementById('start-button');
let endButton = document.getElementById('end-button');
let historyList = document.getElementById('history-list');
let homePage = document.getElementById('home-page');
let historyPage = document.getElementById('history-page');
let appearancePage = document.getElementById('appearance-page');
let chatPage = document.getElementById('chat-page');
let chatMessages = document.getElementById('chat-messages');
let chatInput = document.getElementById('chat-input');
let startTime;

function showHome() {
    homePage.classList.add('active');
    historyPage.classList.remove('active');
    appearancePage.classList.remove('active');
    chatPage.classList.remove('active');
}

function showHistory() {
    homePage.classList.remove('active');
    historyPage.classList.add('active');
    appearancePage.classList.remove('active');
    chatPage.classList.remove('active');
}

function showAppearance() {
    homePage.classList.remove('active');
    historyPage.classList.remove('active');
    appearancePage.classList.add('active');
    chatPage.classList.remove('active');
}

function toggleChat() {
    chatPage.classList.add('active');
    homePage.classList.remove('active');
    historyPage.classList.remove('active');
    appearancePage.classList.remove('active');
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
        new Notification("Time check", { body: "Time to check your progress!" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Time check", { body: "Time to check your progress!" });
            }
        });
    }
}

function startTimer() {
    let duration = 60 * 60; // 60 minutes
    startTime = Date.now();
    startButton.disabled = true;
    endButton.disabled = false;

    const topic = document.getElementById('coding-topic').value || 'No topic entered';
    const slack_id = document.getElementById('slack-id').value || 'No Slack ID entered';
    const notificationInterval = parseInt(document.getElementById('notification-interval').value) * 60 * 1000 || 15 * 60 * 1000;
    const notificationStart = parseInt(document.getElementById('notification-start').value) * 60 * 1000 || 0;
    axios.get
    if (isNaN(notificationInterval)) {
        notificationInterval = 15 * 60 * 1000;
    }
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

    notificationTimer = setTimeout(() => {
        notificationTimer = setInterval(sendNotification, notificationInterval);
    }, notificationStart);
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
