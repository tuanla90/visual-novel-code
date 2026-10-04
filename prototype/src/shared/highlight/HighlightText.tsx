import { createContext, Fragment, useContext, type ReactNode } from 'react';
import { Engine } from './engine.js';
import './highlight.css';
import { useVnStore } from '../vn/vn-store';

const HighlightContext = createContext<Engine | null>(null);
export function HighlightProvider({ engine, children }: { engine: Engine; children: ReactNode }) {
  return <HighlightContext.Provider value={engine}>{children}</HighlightContext.Provider>;
}

/** Render tokens as React children, including during typewriter updates. Never mutate React's DOM. */
export function HighlightText({ text }: { text: string }) {
  const engine = useContext(HighlightContext);
  const enabled = useVnStore(s => s.highlightEnabled);
  if (!engine || !enabled) return <>{text}</>;
  const tokens = engine.tokenize(text);
  let end = 0;
  const nodes = tokens.map((token) => {
    const prefix = text.slice(end, token.start);
    end = token.end;
    return <Fragment key={token.start}>{prefix}<span className={`game-highlight game-highlight--${token.category}`} data-highlight={token.category}>{token.text}</span></Fragment>;
  });
  return <>{nodes}{text.slice(end)}</>;
}
