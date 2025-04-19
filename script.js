// script.js

// DOM Elements
const startBtn = document.getElementById('start_test_btn');
const typingDiv = document.getElementById('typing_test_div');
const startScreenDiv = document.getElementById('start_screen_div');
const resultDiv = document.getElementById('result_div');
const sentenceDisplay = document.getElementById('sentenceDisplay');
const timerDisplay = document.getElementById('timer').querySelector('span');
const typedCharDisplay = document.getElementById('typed_characters').querySelector('span');
const accuracyDisplay = document.getElementById('accuracy');
const wpmDisplay = document.getElementById('wpm');
const resultCharDisplay = document.getElementById('typed_characters_result');
const resultTimerDisplay = document.getElementById('timer_result');
const restartBtn = document.getElementById('restart');
const retryBtn = document.getElementById('retry_test');
const saveBtn = document.getElementById('save_result');
const userNameInput = document.getElementById('user_name');
const sentences = [
  "learning to type faster takes practice patience and focus but the results are worth the time and effort you invest",
  "the keyboard felt comfortable under my fingers as i typed each word quickly and accurately without looking down even once",
  "every keystroke brings me closer to mastering this skill and achieving high speed and precision in every sentence i write",
  "consistency and dedication are key when building any habit including typing practice which should be done daily for best improvement",
  "the computer screen glowed softly as i typed each letter trying not to make mistakes while staying calm and focused",
  "with every attempt my speed increased slightly and my confidence grew stronger as i improved in both accuracy and speed",
  "typing is not only useful for coding and writing but also helps in exams assignments and daily online communication tasks",
  "i try to sit straight and relax my hands so i can avoid strain while practicing typing for long sessions",
  "small improvements matter when it comes to typing even gaining one more word per minute can feel like a big achievement",
  "the best part of learning typing is seeing how natural it becomes after practicing regularly without thinking about every key",
  "errors are part of the process and should never discourage you from continuing to improve your typing performance and rhythm",
  "i used simple sentences in the beginning and gradually moved to complex ones as i got better at typing fast",
  "my hands remember the positions of keys automatically now after days of practice which shows the power of muscle memory",
  "setting goals like reaching forty words per minute can help track progress and give motivation to keep pushing each day",
  "this project helped me understand javascript better especially how logic is used to measure speed accuracy and time in typing",
  "watching the letters light up in green or red gave instant feedback which helped me adjust and correct my errors",
  "i added features like word count accuracy timer and leaderboard to make the typing test more fun and competitive overall",
  "using localstorage allowed the data to stay saved between sessions so i could always see my past scores and progress",
  "creating levels with increasing difficulty made the typing test more challenging and fun keeping users engaged as they try to improve",
  "i hope this typing project helps others learn and improve just like it helped me while learning javascript and programming basics"
];
// Sentence
let sentence = "Typing is an art of accuracy and speed.";
let currentCharIndex = 0;
let timer;
let timeElapsed = 0;
let timerRunning = false;
let totalTypedChars = 0;
let correctChars = 0;

function startTypingTest() {
    startScreenDiv.style.display = 'none';
    typingDiv.style.display = 'flex';
    resultDiv.style.display = 'none';
    sentenceDisplay.innerHTML = '';

    // Pick a random sentence
    sentence = sentences[Math.floor(Math.random() * sentences.length)];

    // Reset values
    currentCharIndex = 0;
    timeElapsed = 0;
    timerRunning = false;
    totalTypedChars = 0;
    correctChars = 0;
    timerDisplay.textContent = "00:00";
    typedCharDisplay.textContent = "0";

    // Display sentence with spans
    sentence.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        if (index === 0) span.classList.add('current');
        sentenceDisplay.appendChild(span);
    });

    // Listen for keypress
    document.addEventListener('keydown', handleKeyPress);
}
function startTimer() {
    timerRunning = true;
    timer = setInterval(() => {
        timeElapsed++;
        let minutes = String(Math.floor(timeElapsed / 60)).padStart(2, '0');
        let seconds = String(timeElapsed % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}
function handleKeyPress(e) {
    const allSpans = sentenceDisplay.querySelectorAll('span');

    if (!timerRunning && /^[a-zA-Z0-9.,'"!? ]$/.test(e.key)) {
        startTimer();
    }

    if (e.key.length === 1 || e.key === 'Backspace') {
        // Remove current class from all
        allSpans.forEach(span => span.classList.remove('current'));

        if (e.key === 'Backspace') {
            if (currentCharIndex > 0) {
                currentCharIndex--;
                const span = allSpans[currentCharIndex];
                span.classList.remove('correct', 'incorrect');
                span.classList.add('current');
            }
        } else {
            const currentSpan = allSpans[currentCharIndex];
            totalTypedChars++;

            if (e.key === sentence[currentCharIndex]) {
                currentSpan.classList.add('correct');
                correctChars++;
            } else {
                currentSpan.classList.add('incorrect');
            }

            currentCharIndex++;
            if (currentCharIndex < allSpans.length) {
                allSpans[currentCharIndex].classList.add('current');
            } else {
                finishTest();
            }
        }

        typedCharDisplay.textContent = totalTypedChars;
    }
}
function finishTest() {
    clearInterval(timer);
    document.removeEventListener('keydown', handleKeyPress);

    typingDiv.style.display = 'none';
    resultDiv.style.display = 'flex';

    const wpm = Math.round((correctChars / 5) / (timeElapsed / 60));
    const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 0;

    wpmDisplay.textContent = `${wpm} wpm`;
    accuracyDisplay.textContent = `${accuracy}%`;
    resultCharDisplay.textContent = totalTypedChars;
    resultTimerDisplay.textContent = timerDisplay.textContent;
}
restartBtn.addEventListener('click', startTypingTest);
retryBtn.addEventListener('click', startTypingTest);
startBtn.addEventListener('click', startTypingTest);

function showOnly(sectionId) {
    const sections = [
      startScreenDiv,
      typingDiv,
      resultDiv,
      document.getElementById('leaderboard_div'),
      document.getElementById('faqs')
    ];
    
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId).style.display = 'flex';
  }
  document.querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        showOnly(targetId);
  
        // Optional: Refresh leaderboard on nav click
        if (targetId === 'leaderboard_div' && typeof loadLeaderboard === 'function') {
          loadLeaderboard();
        }
      } else {
        // If no data-target, assume Home
        showOnly('start_screen_div');
      }
    });
  });
  document.getElementById('save_result').addEventListener('click', () => {
    const nameInput = document.getElementById('user_name');
    const name = nameInput.value.trim() || 'Anonymous';

    const wpm = parseInt(document.getElementById('wpm').textContent);
    const accuracy = parseFloat(document.getElementById('accuracy').textContent);
    const characters = parseInt(document.getElementById('typed_characters_result').textContent);
    const time = document.getElementById('timer_result').textContent;
  
    const result = {
      name,
      wpm,
      accuracy,
      characters,
      time,
    };
  
    saveToLeaderboard(result);
    nameInput.value = ""; // Clear input field
  
    showOnly('start_screen_div'); // Go back to home screen
  });