import React from 'react';
import { Heading1, Heading2, Heading3, Type } from 'lucide-react';
import { ToolbarButton } from '../ToolbarButton';
import { formatCommands, isFormatActive } from '../../../utils/formatting';

export function HeadingControls() {
  return (
    <>
      <ToolbarButton 
        icon={Heading1} 
        onClick={formatCommands.heading1}
        isActive={isFormatActive('heading1')}
        tooltip="Heading 1"
      />
      <ToolbarButton 
        icon={Heading2} 
        onClick={formatCommands.heading2}
        isActive={isFormatActive('heading2')}
        tooltip="Heading 2"
      />
      <ToolbarButton 
        icon={Heading3} 
        onClick={formatCommands.heading3}
        isActive={isFormatActive('heading3')}
        tooltip="Heading 3"
      />
      <ToolbarButton 
        icon={Type} 
        onClick={formatCommands.paragraph}
        isActive={isFormatActive('paragraph')}
        tooltip="Normal Text"
      />
    </>
  );
}