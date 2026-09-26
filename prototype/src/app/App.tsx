import { useState } from 'react';
import { gameContent, useGameStore } from '../shared/store';
import { GameScreen } from './GameScreen';
import { TitleScreen } from './TitleScreen';

export default function App() {
  const progress = useGameStore((s) => s.progress);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);
  // Màn tiêu đề hiện khi mở ứng dụng, kể cả khi có tiến độ đã lưu (để chọn "Chơi tiếp").
  const [titleDismissed, setTitleDismissed] = useState(false);
  const showTitle = !titleDismissed || progress === null;

  if (showTitle) {
    return (
      <TitleScreen
        title={gameContent.meta.title}
        isSample={gameContent.meta.isSample}
        hasSavedProgress={progress !== null}
        onStart={() => {
          if (progress) resetGame();
          startGame();
          setTitleDismissed(true);
        }}
        onContinue={() => setTitleDismissed(true)}
      />
    );
  }
  return <GameScreen />;
}
