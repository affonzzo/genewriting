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
}

export default function Editor({ 
  mode, 
  text, 
  onTextChange,
  isLocked = false,
  lockedContent = ''
}: EditorProps) {
  return (
    <Paper>
      {isLocked && lockedContent && (
        <div className="border-b border-gray-100">
          <SimpleEditor
            content={lockedContent}
            onChange={() => {}}
            readOnly
          />
        </div>
      )}
      <SimpleEditor
        content={text}
        onChange={onTextChange}
        readOnly={isLocked}
      />
    </Paper>
  );
}