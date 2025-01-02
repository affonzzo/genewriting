import React from 'react';
import { Undo, Redo } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { formatCommands } from '../../../utils/formatting';

export function HistoryControls() {
  return (
    <>
      <ToolbarButton 
        icon={Undo} 
        onClick={formatCommands.undo}
        tooltip="Undo (Ctrl+Z)"
      />
      <ToolbarButton 
        icon={Redo} 
        onClick={formatCommands.redo}
        tooltip="Redo (Ctrl+Y)"
      />
    </>
  );
}