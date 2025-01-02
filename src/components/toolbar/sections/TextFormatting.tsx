import React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { formatCommands, isFormatActive } from '../../../utils/formatting';

export function TextFormatting() {
  return (
    <>
      <ToolbarButton 
        icon={Bold} 
        onClick={formatCommands.bold}
        isActive={isFormatActive('bold')}
        tooltip="Bold (Ctrl+B)"
      />
      <ToolbarButton 
        icon={Italic} 
        onClick={formatCommands.italic}
        isActive={isFormatActive('italic')}
        tooltip="Italic (Ctrl+I)"
      />
      <ToolbarButton 
        icon={Underline} 
        onClick={formatCommands.underline}
        isActive={isFormatActive('underline')}
        tooltip="Underline (Ctrl+U)"
      />
    </>
  );
}