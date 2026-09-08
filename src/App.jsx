import React from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import ControlPanel from './components/ControlPanel';
import './css/App.css';

/**
 * Main Arrow Flow Application Component.
 * Integrates the Header, 5x5 GameBoard, and ControlPanel.
 */
export default function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <GameBoard />
        <ControlPanel />
      </main>

      <footer className="app-footer">
        <p>Arrow Flow Engine — Built with <span>React</span> + <span>Vite</span></p>
      </footer>
    </div>
  );
}
