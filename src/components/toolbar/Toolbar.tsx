import React, { useState } from 'react';
import { ToolbarContainer } from './ToolbarContainer';
import { ToolbarSection } from './ToolbarSection';
import { TextFormatting } from './sections/TextFormatting';
import { AlignmentControls } from './sections/AlignmentControls';
import { ListsAndQuotes } from './sections/ListsAndQuotes';
import { HeadingControls } from './sections/HeadingControls';
import { HistoryControls } from './sections/HistoryControls';

export function Toolbar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ToolbarContainer isVisible={isVisible} onToggleVisibility={() => setIsVisible(!isVisible)}>
      <div className="p-1.5 space-y-2">
        <ToolbarSection>
          <TextFormatting />
        </ToolbarSection>

        <ToolbarSection>
          <AlignmentControls />
        </ToolbarSection>

        <ToolbarSection>
          <ListsAndQuotes />
        </ToolbarSection>

        <ToolbarSection>
          <HeadingControls />
        </ToolbarSection>

        <ToolbarSection showDivider={false}>
          <HistoryControls />
        </ToolbarSection>
      </div>
    </ToolbarContainer>
  );
}