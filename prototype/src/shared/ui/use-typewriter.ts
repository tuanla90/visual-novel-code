import { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../audio/sound-engine';

export interface UseTypewriterOptions {
  text: string;
  speedMs?: number;
  instant?: boolean;
  onDone?: () => void;
}

export interface UseTypewriterResult {
  displayedText: string;
  isDone: boolean;
  completeImmediately: () => void;
}

/**
 * Hook gõ chữ từng ký tự phong cách Visual Novel.
 * Hỗ trợ bấm để hiện hết câu ngay lập tức, phát SFX gõ phím lách cách tinh tế.
 */
export function useTypewriter({
  text,
  speedMs = 22,
  instant = false,
  onDone,
}: UseTypewriterOptions): UseTypewriterResult {
  const [prevText, setPrevText] = useState(text);
  const [charIndex, setCharIndex] = useState(instant ? text.length : 0);

  if (text !== prevText) {
    setPrevText(text);
    setCharIndex(instant ? text.length : 0);
  }

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (instant) {
      onDoneRef.current?.();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setCharIndex(current);

      // Phát tiếng gõ phím nhẹ nhàng mỗi 2-3 ký tự
      if (current % 2 === 0 && current < text.length) {
        soundEngine.playSfx('typewriter');
      }

      if (current >= text.length) {
        clearInterval(interval);
        onDoneRef.current?.();
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs, instant]);

  const completeImmediately = () => {
    setCharIndex(text.length);
    onDoneRef.current?.();
  };

  const isDone = instant || charIndex >= text.length;

  return {
    displayedText: isDone ? text : text.slice(0, charIndex),
    isDone,
    completeImmediately,
  };
}
