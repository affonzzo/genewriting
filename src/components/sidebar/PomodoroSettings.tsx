import React from 'react';
import { Settings } from 'lucide-react';
import { PomodoroSettings } from '../../utils/pomodoro/types';

interface PomodoroSettingsProps {
  settings: PomodoroSettings;
  onSave: (settings: PomodoroSettings) => void;
  onClose: () => void;
}

export function PomodoroSettings({ settings, onSave, onClose }: PomodoroSettingsProps) {
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Timer Settings</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={localSettings.workDuration}
            onChange={(e) => setLocalSettings(s => ({ ...s, workDuration: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={localSettings.shortBreakDuration}
            onChange={(e) => setLocalSettings(s => ({ ...s, shortBreakDuration: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={localSettings.longBreakDuration}
            onChange={(e) => setLocalSettings(s => ({ ...s, longBreakDuration: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sessions Until Long Break
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={localSettings.sessionsUntilLongBreak}
            onChange={(e) => setLocalSettings(s => ({ ...s, sessionsUntilLongBreak: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}