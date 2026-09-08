import React from 'react';
import Header from './components/Header';
import GameBoardPlaceholder from './components/GameBoardPlaceholder';
import ControlPanel from './components/ControlPanel';
import './css/App.css';

/**
 * Main Arrow Flow Application Component.
 * Integrates the Header, Game Board Canvas, and Control Panel into a dark UI structure.
 */
export default function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <GameBoardPlaceholder />
        <ControlPanel />
      </main>

      <footer className="app-footer">
        <p>Arrow Flow Engine — Built with <span>React</span> + <span>Vite</span></p>
      </footer>
    </div>
  );
}
