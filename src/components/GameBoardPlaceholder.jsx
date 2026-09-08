import React from 'react';
import { Grid, ArrowUpRight } from 'lucide-react';
import { GRID_ROWS, GRID_COLS } from '../utils/constants';
import '../css/GameBoard.css';

/**
 * Placeholder component for the main interactive grid canvas.
 */
export default function GameBoardPlaceholder() {
  // Generate sample cells for layout visualization
  const totalCells = GRID_ROWS * GRID_COLS;
  const sampleCells = Array.from({ length: totalCells }, (_, i) => i);

  return (
    <div className="game-board-container">
      <div className="board-header">
        <div className="board-title">
          <Grid size={18} />
          <span>Grid Workspace</span>
        </div>
        <span className="board-dim-badge">{GRID_ROWS} × {GRID_COLS}</span>
      </div>

      <div className="grid-canvas-placeholder">
        {sampleCells.map((idx) => (
          <div key={idx} className="grid-cell-sample">
            <ArrowUpRight size={14} style={{ opacity: 0.2 }} />
          </div>
        ))}

        <div className="grid-overlay-notice">
          <div className="notice-icon">
            <ArrowUpRight size={26} />
          </div>
          <h3 className="notice-title">Arrow Flow Game Board</h3>
          <p className="notice-desc">
            The project environment and UI shell are ready. Gameplay interactions & direction mechanics can be plugged in next.
          </p>
        </div>
      </div>
    </div>
  );
}
