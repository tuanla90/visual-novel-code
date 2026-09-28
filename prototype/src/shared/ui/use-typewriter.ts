import { useCallback, useEffect, useRef, useState } from 'react';
import { soundEngine } from '../audio/sound-engine';

export interface UseTypewriterOptions {
  text: string;
  speedMs?: number;
  instant?: boolean;
}

export interface UseTypewriterResult {
  displayedText: string;
  isDone: boolean;
  completeImmediately: () => void;
}

/**
 * Hook gõ chữ từng ký tự phong cách Visual Novel.
 * Bấm để hiện hết câu ngay: dừng hẳn bộ đếm (không để nhịp sau kéo chữ lùi lại), phát SFX gõ phím nhẹ.
 */
export function useTypewriter({ text, speedMs = 22, instant = false }: UseTypewriterOptions): UseTypewriterResult {
  const [prevText, setPrevText] = useState(text);
  const [charIndex, setCharIndex] = useState(instant ? text.length : 0);

  if (text !== prevText) {
    setPrevText(text);
    setCharIndex(instant ? text.length : 0);
  }

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (instant || speedMs <= 0) return;
    let current = 0;
    intervalRef.current = setInterval(() => {
      current++;
      setCharIndex(current);
      // Tiếng gõ phím nhẹ mỗi 2 ký tự
      if (current % 2 === 0 && current < text.length) soundEngine.playSfx('typewriter');
      if (current >= text.length) stop();
    }, speedMs);
    return stop;
  }, [text, speedMs, instant, stop]);

  const completeImmediately = useCallback(() => {
    stop();
    setCharIndex(text.length);
  }, [stop, text.length]);

  const isDone = instant || speedMs <= 0 || charIndex >= text.length;

  return {
    displayedText: isDone ? text : text.slice(0, charIndex),
    isDone,
    completeImmediately,
  };
}
