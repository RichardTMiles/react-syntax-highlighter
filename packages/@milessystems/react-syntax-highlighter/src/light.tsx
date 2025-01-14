import highlight from './highlight';
import lowlight from 'lowlight/lib/core';

const SyntaxHighlighter = highlight(lowlight, {});

// @ts-ignore
SyntaxHighlighter.registerLanguage = lowlight.registerLanguage;

export default SyntaxHighlighter;
