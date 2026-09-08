import React, { useState } from 'react';
import Tile from './Tile';
import { GRID_ROWS, GRID_COLS } from '../utils/constants';
import { createEmptyGrid, getNextDirection } from '../utils/helpers';
import { MousePointerClick, RotateCcw } from 'lucide-react';
import '../css/GameBoard.css';

/**
 * Reusable GameBoard component representing the 5x5 Arrow Flow grid matrix.
 */
export default function GameBoard() {
  // Simple React state holding the 2D grid of tiles
  const [grid, setGrid] = useState(() => createEmptyGrid(GRID_ROWS, GRID_COLS));

  /**
   * Click handler to cycle arrow direction on a regular tile.
   * Start and Target tiles remain fixed.
   */
  const handleTileClick = (row, col) => {
    setGrid((prevGrid) =>
      prevGrid.map((r, rIdx) =>
        r.map((tile, cIdx) => {
          if (rIdx === row && cIdx === col) {
            // Ignore click on Start or Target tiles
            if (tile.isStart || tile.isTarget) return tile;

            // Cycle arrow direction: empty -> UP -> RIGHT -> DOWN -> LEFT -> empty
            return {
              ...tile,
              arrow: getNextDirection(tile.arrow),
            };
          }
          return tile;
        })
      )
    );
  };

  /**
   * Resets all placed arrows on the grid back to empty state.
   */
  const handleReset = () => {
    setGrid(createEmptyGrid(GRID_ROWS, GRID_COLS));
  };

  return (
    <div className="game-board-container">
      <div className="board-header">
        <div className="board-title-group">
          <h2 className="board-title">Game Grid</h2>
          <span className="board-badge">{GRID_ROWS} × {GRID_COLS}</span>
        </div>

        <button className="btn-text-reset" onClick={handleReset} title="Clear board">
          <RotateCcw size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Reset Board
        </button>
      </div>

      {/* 5x5 Responsive Grid Matrix */}
      <div className="grid-5x5-canvas">
        {grid.map((row) =>
          row.map((tile) => (
            <Tile
              key={`${tile.row}-${tile.col}`}
              tile={tile}
              onTileClick={handleTileClick}
            />
          ))
        )}
      </div>

      <div className="board-hint-bar">
        <div className="hint-text">
          <MousePointerClick size={15} />
          <span>Click any tile to rotate / place an arrow</span>
        </div>
      </div>
    </div>
  );
}
