import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export function RichTextEditor({ content, onChange, readOnly = false }: RichTextEditorProps) {
  return (
    <Editor
      disabled={readOnly}
      value={content}
      onEditorChange={onChange}
      init={{
        height: 'calc(100vh - 2rem)',
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist | ' +
          'removeformat',
        content_style: `
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            padding: 1rem;
            min-height: calc(100vh - 4rem);
            max-width: 100%;
          }
        `,
        statusbar: false,
        resize: false,
        branding: false,
        readonly: false, // Never set this to true, use disabled prop instead
        skin: 'oxide',
        quickbars_selection_toolbar: false,
        contextmenu: false,
        elementpath: false,
        remove_script_host: true,
        convert_urls: false,
        paste_data_images: false,
        browser_spellcheck: true,
        directionality: 'ltr'
      }}
    />
  );
}