import { Schema } from 'prosemirror-model';

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+'
    },
    paragraph: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{tag: 'p'}],
      toDOM() { return ['p', 0] }
    },
    heading: {
      attrs: {level: {default: 1}},
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        {tag: 'h1', attrs: {level: 1}},
        {tag: 'h2', attrs: {level: 2}},
        {tag: 'h3', attrs: {level: 3}}
      ],
      toDOM(node) { return ['h' + node.attrs.level, 0] }
    },
    blockquote: {
      group: 'block',
      content: 'block+',
      parseDOM: [{tag: 'blockquote'}],
      toDOM() { return ['blockquote', 0] }
    },
    bullet_list: {
      group: 'block',
      content: 'list_item+',
      parseDOM: [{tag: 'ul'}],
      toDOM() { return ['ul', 0] }
    },
    list_item: {
      content: 'paragraph block*',
      parseDOM: [{tag: 'li'}],
      toDOM() { return ['li', 0] }
    },
    text: {
      group: 'inline'
    },
    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{tag: 'br'}],
      toDOM() { return ['br'] }
    }
  },
  marks: {
    bold: {
      parseDOM: [{tag: 'strong'}, {tag: 'b'}],
      toDOM() { return ['strong'] }
    },
    italic: {
      parseDOM: [{tag: 'em'}, {tag: 'i'}],
      toDOM() { return ['em'] }
    },
    underline: {
      parseDOM: [{tag: 'u'}],
      toDOM() { return ['u'] }
    }
  }
});