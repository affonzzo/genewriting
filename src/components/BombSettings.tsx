import React, { useState } from 'react';
import { Timer } from 'lucide-react';

export default function BombSettings() {
  const [sessionLength, setSessionLength] = useState(15);
  const [maxPauseTime, setMaxPauseTime] = useState(5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Bomb Writing Setup</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session Length (minutes)
          </label>
          <input
            type="number"
            value={sessionLength}
            onChange={(e) => setSessionLength(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Pause Time (seconds)
          </label>
          <input
            type="number"
            value={maxPauseTime}
            onChange={(e) => setMaxPauseTime(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <Timer className="h-4 w-4 mr-2" />
          Start Bomb Writing
        </button>
      </div>
    </div>
  );
}