import { Schema, Node as ProseMirrorNode } from 'prosemirror-model';
import { DOMParser, DOMSerializer } from 'prosemirror-model';

export function htmlToDoc(schema: Schema, content: string): ProseMirrorNode {
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = content || '<p></p>';

  // Parse the HTML content into a ProseMirror document
  return DOMParser.fromSchema(schema).parse(container);
}

export function serializeDoc(doc: ProseMirrorNode): string {
  // Create a temporary container
  const container = document.createElement('div');
  
  // Serialize the ProseMirror document to DOM
  const fragment = DOMSerializer.fromSchema(doc.type.schema).serializeFragment(doc.content);
  container.appendChild(fragment);
  
  return container.innerHTML;
}