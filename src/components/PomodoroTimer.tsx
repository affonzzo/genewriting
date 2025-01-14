import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Settings } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(33 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPomodoro, setCurrentPomodoro] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            clearInterval(timerRef.current);
            return 33 * 60;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4">Pomodoro Timer</h2>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full ${
                num <= currentPomodoro ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-4xl font-bold mb-6">{formatTime(timeLeft)}</div>
        <button
          onClick={toggleTimer}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Start
            </>
          )}
        </button>
      </div>
    </div>
  );
}