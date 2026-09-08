import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import ControlPanel from './components/ControlPanel';
import './css/App.css';

/**
 * Main Arrow Flow Application Component.
 * Integrates Header, 5x5 GameBoard, and ControlPanel with timer toggle settings.
 */
export default function App() {
  const [moveCount, setMoveCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [gameStatus, setGameStatus] = useState('IDLE');

  const handleToggleTimer = () => {
    setIsTimerEnabled((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <GameBoard
          isTimerEnabled={isTimerEnabled}
          onMoveCountChange={setMoveCount}
          onElapsedTimeChange={setElapsedSeconds}
          onGameStatusChange={setGameStatus}
        />
        <ControlPanel
          moveCount={moveCount}
          elapsedSeconds={elapsedSeconds}
          isTimerEnabled={isTimerEnabled}
          gameStatus={gameStatus}
          onToggleTimer={handleToggleTimer}
        />
      </main>

      <footer className="app-footer">
        <p>Arrow Flow Engine — Built with <span>React</span> + <span>Vite</span></p>
      </footer>
    </div>
  );
}
