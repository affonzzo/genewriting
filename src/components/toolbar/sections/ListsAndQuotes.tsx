import React from 'react';
import { List, Quote } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { formatCommands, isFormatActive } from '../../../utils/formatting';

export function ListsAndQuotes() {
  return (
    <>
      <ToolbarButton 
        icon={List} 
        onClick={formatCommands.list}
        isActive={isFormatActive('list')}
        tooltip="Bullet List"
      />
      <ToolbarButton 
        icon={Quote} 
        onClick={formatCommands.quote}
        isActive={isFormatActive('quote')}
        tooltip="Quote"
      />
    </>
  );
}