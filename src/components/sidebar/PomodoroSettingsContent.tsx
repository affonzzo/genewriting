import React from 'react';
import { PomodoroSettings } from '../../utils/pomodoro/types';

interface PomodoroSettingsContentProps {
  settings: PomodoroSettings;
  onSave: (settings: PomodoroSettings) => void;
  onClose: () => void;
}

export function PomodoroSettingsContent({ settings, onSave, onClose }: PomodoroSettingsContentProps) {
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSettings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duração dos Pomodoros
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="60"
              value={localSettings.workDuration}
              onChange={(e) => setLocalSettings(s => ({ ...s, workDuration: Number(e.target.value) }))}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-4 pr-12 py-2.5"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              min
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duração das Pausas Curtas
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="30"
              value={localSettings.shortBreakDuration}
              onChange={(e) => setLocalSettings(s => ({ ...s, shortBreakDuration: Number(e.target.value) }))}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-4 pr-12 py-2.5"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              min
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duração das Pausas Longas
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="60"
              value={localSettings.longBreakDuration}
              onChange={(e) => setLocalSettings(s => ({ ...s, longBreakDuration: Number(e.target.value) }))}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-4 pr-12 py-2.5"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              min
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pomodoros Por Sessão
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="10"
              value={localSettings.sessionsUntilLongBreak}
              onChange={(e) => setLocalSettings(s => ({ ...s, sessionsUntilLongBreak: Number(e.target.value) }))}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-4 pr-12 py-2.5"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              pomodoros
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}