import React, { useEffect, useState } from "react";
import timerSound from "../audio/alarm-clock.mp3";

// Timer page for RecipeEZ
function Timer() {
  const [audio] = useState(new Audio(timerSound));
  const [playing, setPlaying] = useState(false);
  const [timerStatus, setTimerStatus] = useState(false);
  const [timerInput, setTimerInput] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [timerClock, setTimerClock] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  // Loop timer audio
  audio.loop = true;

  // Playing and pausing timer audio
  useEffect(() => {
    playing ? audio.play() : audio.pause();
    // playing state as dependency
  }, [playing, audio]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (timerStatus && timerClock.seconds > 0) {
        setTimerClock({ ...timerClock, seconds: timerClock.seconds - 1 });
      }
      if (timerStatus && timerClock.seconds === 0) {
        if (timerStatus && timerClock.minutes === 0) {
          if (timerStatus && timerClock.hours === 0) {
            clearInterval(timer);
            setPlaying(true);
          } else {
            setTimerClock({
              hours: timerClock.hours - 1,
              minutes: 59,
              seconds: 59,
            });
          }
        } else {
          setTimerClock({
            ...timerClock,
            minutes: timerClock.minutes - 1,
            seconds: 59,
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  // Function for starting timer
  const startTimer = () => {
    let totalTime = 0;
    setPlaying(false);

    totalTime += +timerInput.hours * 3600;
    totalTime += +timerInput.minutes * 60;
    totalTime += +timerInput.seconds;

    setTimerClock({
      seconds: Math.floor((totalTime % 3600) % 60),
      minutes: Math.floor((totalTime % 3600) / 60),
      hours: Math.floor(totalTime / 3600),
    });

    setTimerInput({ seconds: 0, minutes: 0, hours: 0 });
    setTimerStatus(true);
  };

  return (
    <div className="timer-container">
      <h2 className="text-danger">Timer</h2>
      <div className="timer-content">
        <div className="timer-display">
          {timerClock.hours < 10 ? `0${timerClock.hours}` : timerClock.hours}:
          {timerClock.minutes < 10
            ? `0${timerClock.minutes}`
            : timerClock.minutes}
          :
          {timerClock.seconds < 10
            ? `0${timerClock.seconds}`
            : timerClock.seconds}
        </div>
        <div className="input-grp">
          <label>Enter hours:</label>
          <input
            type="number"
            min="0"
            value={timerInput.hours}
            onChange={(e) =>
              setTimerInput({ ...timerInput, hours: e.target.value })
            }
          ></input>
          <small style={{ color: "red", marginBottom: "0.5em" }}></small>
          <label>Enter minutes:</label>
          <input
            type="number"
            min="0"
            value={timerInput.minutes}
            onChange={(e) =>
              setTimerInput({ ...timerInput, minutes: e.target.value })
            }
          ></input>
          <small style={{ color: "red", marginBottom: "0.5em" }}></small>
          <label>Enter seconds:</label>
          <input
            type="number"
            min="0"
            value={timerInput.seconds}
            onChange={(e) =>
              setTimerInput({ ...timerInput, seconds: e.target.value })
            }
          ></input>
          <small style={{ color: "red", marginBottom: "0.5em" }}></small>
          <button
            type="button"
            className="btn btn-success"
            onClick={startTimer}
          >
            Start
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setTimerStatus(true)}
          >
            Resume
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setTimerStatus(false);
              setPlaying(false);
            }}
          >
            Pause / Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
