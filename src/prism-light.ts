import highlight from './highlight';
import refractor from 'refractor/core';

const SyntaxHighlighter = highlight(refractor, {});


// @ts-ignore
SyntaxHighlighter.registerLanguage = (_, language) =>
  refractor.register(language);

// @ts-ignore
SyntaxHighlighter.alias = (name, aliases) => refractor.alias(name, aliases);

export default SyntaxHighlighter;
