import React, { useState } from 'react';
import Tile from './Tile';
import { GRID_ROWS, GRID_COLS, DIRECTIONS } from '../utils/constants';
import { createEmptyGrid, getNextClockwiseDirection } from '../utils/helpers';
import { MousePointerClick, RotateCcw } from 'lucide-react';
import '../css/GameBoard.css';

/**
 * Reusable GameBoard component managing the 5x5 Arrow Flow grid state.
 */
export default function GameBoard() {
  // Store board tiles in React state
  const [grid, setGrid] = useState(() => createEmptyGrid(GRID_ROWS, GRID_COLS));

  /**
   * Click handler to rotate arrow clockwise (+90°) on regular tiles.
   * Start and Target tiles remain fixed anchor points.
   */
  const handleTileClick = (row, col) => {
    setGrid((prevGrid) =>
      prevGrid.map((r, rIdx) =>
        r.map((tile, cIdx) => {
          if (rIdx === row && cIdx === col) {
            // Ignore click on Start or Target tiles
            if (tile.isStart || tile.isTarget) return tile;

            // Determine next clockwise direction: UP -> RIGHT -> DOWN -> LEFT -> UP
            const nextArrow = getNextClockwiseDirection(tile.arrow);

            // Calculate new rotation angle (+90deg clockwise)
            const nextDegrees = tile.arrow !== null ? tile.rotationDegrees + 90 : 0;

            return {
              ...tile,
              arrow: nextArrow,
              rotationDegrees: nextDegrees,
            };
          }
          return tile;
        })
      )
    );
  };

  /**
   * Resets all placed arrows back to initial empty grid.
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

      {/* 5x5 Responsive Grid Canvas */}
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
          <span>Click any tile to rotate clockwise (↑ → ↓ ←)</span>
        </div>
      </div>
    </div>
  );
}
