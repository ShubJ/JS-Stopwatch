window.onload = function () {
  var secs = 0;
  var mins = 0;
  var msecs = 0;
  var currentAction = 0; //0 for start and 1 for reset;
  var currentPauseAction = 0; //0 for pause and 1 for resume;
  var timer;
  var laps = [];

  var startResetButton = document.getElementById("st-rst");
  var pauseButton = document.getElementById("pause");
  var lapButton = document.getElementById("lap");
  var msecTime = document.getElementById("msec");
  var minTime = document.getElementById("min");
  var secTime = document.getElementById("sec");

  var rightSection = document.getElementById("right");

  lapButton.onclick = function () {
    let tempMSecs = msecs < 100 ? "0" + msecs / 10 : msecs / 10;
    let tempSecs = secs < 10 ? "0" + secs : secs;
    let tempMins = mins < 10 ? "0" + mins : mins;

    let id = laps.length + 1;
    let lapTime =
      tempMins +
      ":" +
      tempSecs +
      "<span style='color: crimson;'>." +
      tempMSecs +
      "</span>";
    laps.push({
      id: id,
      time: lapTime,
    });
    var lapDiv = document.createElement("div");
    lapDiv.className = "lap";
    lapDiv.innerHTML = `<span class="lap-id">${id}</span> <span class="lap-time">${lapTime}</span>`;
    rightSection.appendChild(lapDiv);
    if (id > 0) rightSection.style.display = ""; // Show Right Section (Laps)
  };

  pauseButton.onclick = function () {
    if (currentPauseAction == 0) {
      clearInterval(timer); // Stop the timer
      pauseButton.innerText = "Resume"; // Change Pause to Resume
      lapButton.style.display = "none"; // Hide Lap Button
      startResetButton.style.display = ""; // Show Start/Reset Button
      currentPauseAction = 1; // Set Pause Action to Resume
    } else {
      timer = setInterval(timerFunction, 10); // Resume the timer
      pauseButton.innerText = "Pause"; // Change Resume to Pause
      lapButton.style.display = ""; // Show Lap Button
      startResetButton.style.display = "none"; // Hide Start/Reset Button
      currentPauseAction = 0; // Set default Pause Action
    }
  };

  startResetButton.onclick = function () {
    if (currentAction == 0) {
      timer = setInterval(timerFunction, 10); // Start the timer.
      startResetButton.innerText = "Reset"; // Change Start to Reset
      startResetButton.className = ""; // Remove the class from button
      startResetButton.style.display = "none"; // Hide Start/Reset Button
      pauseButton.style.display = ""; // Show Pause/Resume Button
      lapButton.style.display = ""; // Show Lap Button
      currentAction = 1; // Set Start Action to Reset
    } else {
      clearInterval(timer); // Stop the timer
      secs = 0;
      mins = 0;
      msecs = 0;
      setTime(true);
      laps = []; // Clear all Laps
      rightSection.innerHTML = ""; // Empty Laps from the Right Section
      rightSection.style.display = "none"; // Hide Right Section (Laps)
      startResetButton.innerText = "Start"; // Change Reset to Start
      startResetButton.className = "start-button"; // Change the class name
      pauseButton.style.display = "none"; // Hide Pause/Resume Button
      lapButton.style.display = "none"; // Hide Lap Button
      pauseButton.innerText = "Pause"; // Set Pause button
      currentAction = 0; // Set default Start Action
      currentPauseAction = 0; // Set default Pause Action
    }
  };

  function timerFunction() {
    msecs += 10;
    setTime();
  }

  function setTime(isReset = false) {
    if (msecs >= 1000) {
      secs++;
      msecs = 0;
      if (secs >= 60) {
        mins += 1;
        secs = 0;
        mins < 10
          ? (minTime.innerText = "0" + mins)
          : (minTime.innerText = mins);
      }
    }
    secs < 10 ? (secTime.innerText = "0" + secs) : (secTime.innerText = secs);
    msecs < 100
      ? (msecTime.innerText = "0" + msecs / 10)
      : (msecTime.innerText = msecs / 10);

    if (isReset) {
      minTime.innerText = "00";
    }
  }
};
