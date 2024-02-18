class PomodoroTimer {
  constructor(workTime = 25, breakTime = 5) {
    this.workTime = workTime; // Work time in minutes
    this.breakTime = breakTime; // Break time in minutes
    this.seconds = 0; // Countdown seconds
    this.currentMinute = this.workTime; // Initialize with workTime instead of workTime - 1
    this.interval = null;
    this.isWorkTime = true; // Flag to indicate if it's work time or break time
    this.paused = false; // Flag to indicate if the timer is paused
    this.initDOM();
  }

  initDOM() {
    // Call updateDisplay here to ensure the initial timer setup is shown
    this.updateDisplay();
    document.getElementById('work').classList.add('active');
  }

  playChime() {
    const chime = document.getElementById('timerChime');
    if (chime) {
      chime.play().catch(error => console.error("Audio play failed:", error));
    } else {
      console.error("Chime element not found");
    }
  }

  switchMode() {
    this.isWorkTime = !this.isWorkTime;
    // Adjust currentMinute initialization to immediately reflect the switch
    this.currentMinute = this.isWorkTime ? this.workTime : this.breakTime;
    this.seconds = 0; // Reset seconds to 0 for a clean switch
    this.togglePanels();
    this.playChime();
    this.updateDisplay(); // Ensure display is updated right after switching modes
  }

  formatTime(time) {
    return time < 10 ? `0${time}` : time.toString();
  }

  togglePanels() {
    const workPanel = document.getElementById('work');
    const breakPanel = document.getElementById('break');
    const circle = document.querySelector('.circle');
    if (this.isWorkTime) {
      workPanel.classList.add('active');
      breakPanel.classList.remove('active');
      circle.style.backgroundColor = 'var(--color-secondary)';
      breakPanel.style.color = 'var(--color-font)';
    } else {
      workPanel.classList.remove('active');
      breakPanel.classList.add('active');
      circle.style.backgroundColor = 'var(--color-break)';
      breakPanel.style.color = 'var(--color-break)';
    }
  }

  updateDisplay() {
    document.getElementById('minutes').innerHTML = this.formatTime(this.currentMinute);
    document.getElementById('seconds').innerHTML = this.formatTime(this.seconds);
  }

  timerFunction() {
    if (!this.paused) {
      if (this.seconds === 0 && this.currentMinute === 0) {
        this.switchMode();
      } else {
        if (this.seconds === 0) {
          this.currentMinute--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
        this.updateDisplay();
      }
    }
  }

  start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "inline-block";
    document.getElementById('reset').style.display = "inline-block";
    this.paused = false;
    if (!this.interval) {
      this.interval = setInterval(() => this.timerFunction(), 1000);
    }
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.currentMinute = this.workTime;
    this.seconds = 0;
    this.isWorkTime = true;
    this.paused = false;
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
    document.getElementById('reset').style.display = "none";
    this.togglePanels();
    this.updateDisplay(); // Make sure to update the display after resetting
  }

  togglePause() {
    this.paused = !this.paused;
    const pauseButton = document.getElementById('pause');
    pauseButton.innerHTML = this.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"</i>';
  }
}

// Example usage
const pomodoroTimer = new PomodoroTimer(); // Customizable work and break times

// Bind the start function to the start button
document.getElementById('start').addEventListener('click', () => pomodoroTimer.start());

// Bind the reset function to the reset button
document.getElementById('reset').addEventListener('click', () => pomodoroTimer.reset());

// Bind the togglePause function to the pause button
document.getElementById('pause').addEventListener('click', () => pomodoroTimer.togglePause());
