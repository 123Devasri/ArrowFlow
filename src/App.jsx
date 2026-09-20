import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import DailyPuzzle from './components/DailyPuzzle';
import AlgorithmsPage from './components/AlgorithmsPage';
import SettingsModal from './components/SettingsModal';
import './css/App.css';

/**
 * Main Arrow Flow Application Component.
 * Integrates top header navigation, tab views (Play, Daily Puzzle, Algorithms), and Settings modal.
 */
export default function App() {
  // Navigation tab state ('play' | 'daily' | 'algorithms')
  const [activeTab, setActiveTab] = useState('play');
  // Selected algorithm mode ('BFS' | 'DFS' | 'DIJKSTRA')
  const [selectedAlgoMode, setSelectedAlgoMode] = useState('BFS');
  // Settings modal visibility state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Timer toggle setting
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);

  /**
   * Handles selecting an algorithm card from the Algorithms section:
   * Sets the active algorithm solver and switches tab immediately to Play mode.
   */
  const handleSelectAlgoMode = (mode) => {
    setSelectedAlgoMode(mode);
    setActiveTab('play');
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="main-content">
        {activeTab === 'play' && (
          <GameBoard
            selectedAlgoMode={selectedAlgoMode}
            isTimerEnabled={isTimerEnabled}
          />
        )}

        {activeTab === 'daily' && (
          <DailyPuzzle
            isTimerEnabled={isTimerEnabled}
            onReturnToPlay={() => setActiveTab('play')}
          />
        )}

        {activeTab === 'algorithms' && (
          <AlgorithmsPage
            onSelectAlgoMode={handleSelectAlgoMode}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Arrow Flow Engine — Built with <span>React</span> + <span>Vite</span></p>
      </footer>

      {/* Settings Modal Dialog */}
      <SettingsModal
        isOpen={isSettingsOpen}
        isTimerEnabled={isTimerEnabled}
        onToggleTimer={() => setIsTimerEnabled((prev) => !prev)}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
