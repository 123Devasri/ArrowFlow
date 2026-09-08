import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import ControlPanel from './components/ControlPanel';
import './css/App.css';

/**
 * Main Arrow Flow Application Component.
 * Integrates the Header, 5x5 GameBoard, and ControlPanel.
 */
export default function App() {
  const [moveCount, setMoveCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('IDLE');

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <GameBoard
          onMoveCountChange={setMoveCount}
          onGameStatusChange={setGameStatus}
        />
        <ControlPanel
          moveCount={moveCount}
          gameStatus={gameStatus}
        />
      </main>

      <footer className="app-footer">
        <p>Arrow Flow Engine — Built with <span>React</span> + <span>Vite</span></p>
      </footer>
    </div>
  );
}
