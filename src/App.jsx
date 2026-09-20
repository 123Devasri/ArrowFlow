import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import DailyPuzzle from './components/DailyPuzzle';
import AlgorithmsPage from './components/AlgorithmsPage';
import SettingsModal from './components/SettingsModal';
import './css/App.css';

/**
 * Main Arrow Flow Application Component.
 * Integrates top header navigation, tab views (Play, Daily Puzzle, Algorithms), and right-side Settings Drawer.
 */
export default function App() {
  // Navigation tab state ('play' | 'daily' | 'algorithms')
  const [activeTab, setActiveTab] = useState('play');
  // Selected algorithm mode ('BFS' | 'DFS' | 'DIJKSTRA')
  const [selectedAlgoMode, setSelectedAlgoMode] = useState('BFS');
  // Settings drawer visibility state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Header game control callbacks registered by active GameBoard
  const [headerControls, setHeaderControls] = useState({ newGame: null, reset: null });

  // Settings preferences state
  const [difficultyKey, setDifficultyKey] = useState('MEDIUM');
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);

  /**
   * Clears daily puzzle localStorage progress
   */
  const handleResetProgress = () => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('arrowflow_')) {
          localStorage.removeItem(key);
        }
      });
      alert('Daily progress cleared!');
    } catch (e) {
      console.error('Error clearing progress', e);
    }
  };

  return (
    <div className="app-container">
      <Header
        activeAlgorithm={selectedAlgoMode}
        onSelectAlgorithm={setSelectedAlgoMode}
        onNewGame={headerControls.newGame}
        onReset={headerControls.reset}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="main-content">
        <GameBoard
          difficultyKey={difficultyKey}
          selectedAlgoMode={selectedAlgoMode}
          isTimerEnabled={isTimerEnabled}
          isAnimationsEnabled={isAnimationsEnabled}
          isSoundEnabled={isSoundEnabled}
          onRegisterControls={setHeaderControls}
        />
      </main>

      <footer className="app-footer">
        <p>Arrow Flow Engine — Built with <span>React</span> + <span>Vite</span></p>
      </footer>

      {/* Right-Side Settings Drawer Panel */}
      <SettingsModal
        isOpen={isSettingsOpen}
        difficultyKey={difficultyKey}
        isTimerEnabled={isTimerEnabled}
        isSoundEnabled={isSoundEnabled}
        isAnimationsEnabled={isAnimationsEnabled}
        onSelectDifficulty={setDifficultyKey}
        onToggleTimer={() => setIsTimerEnabled((prev) => !prev)}
        onToggleSound={() => setIsSoundEnabled((prev) => !prev)}
        onToggleAnimations={() => setIsAnimationsEnabled((prev) => !prev)}
        onResetProgress={handleResetProgress}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
