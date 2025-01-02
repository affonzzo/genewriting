import React from 'react';
import { WritingMode } from '../types';
import { Paper } from './Paper';
import { SimpleEditor } from './Editor/SimpleEditor';

interface EditorProps {
  mode: WritingMode;
  text: string;
  onTextChange: (text: string) => void;
  isLocked?: boolean;
  lockedContent?: string;
  isMarkdownView?: boolean;
}

export default function Editor({ 
  mode, 
  text, 
  onTextChange,
  isLocked = false,
  lockedContent = '',
  isMarkdownView = false
}: EditorProps) {
  return (
    <Paper>
      {isLocked && lockedContent && (
        <div className="border-b border-gray-100">
          <SimpleEditor
            content={lockedContent}
            onChange={() => {}}
            readOnly
            isMarkdownView={isMarkdownView}
          />
        </div>
      )}
      <SimpleEditor
        content={text}
        onChange={onTextChange}
        readOnly={isLocked}
        isMarkdownView={isMarkdownView}
      />
    </Paper>
  );
}