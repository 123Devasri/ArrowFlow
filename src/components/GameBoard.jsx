import React, { useState, useMemo } from 'react';
import Tile from './Tile';
import { GRID_ROWS, GRID_COLS } from '../utils/constants';
import { createEmptyGrid, getNextClockwiseDirection } from '../utils/helpers';
import { calculateFlowPath } from '../algorithms/pathfinding';
import { MousePointerClick, RotateCcw, Sparkles, AlertCircle, Trophy, RefreshCw } from 'lucide-react';
import '../css/GameBoard.css';

/**
 * Reusable GameBoard component managing matrix state, path traversal, and win detection.
 */
export default function GameBoard() {
  // Store board tiles in React state
  const [grid, setGrid] = useState(() => createEmptyGrid(GRID_ROWS, GRID_COLS));

  /**
   * Recalculate path traversal whenever grid state changes.
   * Win detection occurs when flowResult.reachedTarget is true.
   */
  const flowResult = useMemo(() => {
    return calculateFlowPath(grid);
  }, [grid]);

  const isWon = flowResult.reachedTarget;

  /**
   * Click handler to rotate arrow clockwise (+90°) on regular tiles.
   * Pauses board tile interaction when the puzzle is solved.
   */
  const handleTileClick = (row, col) => {
    // Pause board tile interaction once the goal is reached
    if (isWon) return;

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
   * Resets all placed arrows back to initial empty grid and resumes gameplay.
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

      {/* Completion Banner (Win State) */}
      {isWon ? (
        <div className="completion-card">
          <div className="completion-info">
            <div className="completion-icon">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="completion-title">Flow Complete!</h3>
              <p className="completion-sub">Path connected in {flowResult.path.length} steps</p>
            </div>
          </div>

          <button className="btn-play-again" onClick={handleReset}>
            <RefreshCw size={15} />
            <span>Play Again</span>
          </button>
        </div>
      ) : (
        /* Status Bar showing live path calculation metrics */
        <div className="flow-status-bar">
          {flowResult.stopReason === 'LOOP' ? (
            <div className="status-pill status-warning">
              <AlertCircle size={15} />
              <span>Loop Detected</span>
            </div>
          ) : flowResult.stopReason === 'OUT_OF_BOUNDS' ? (
            <div className="status-pill status-muted">
              <span>Path Left Board ({flowResult.path.length} Tiles)</span>
            </div>
          ) : (
            <div className="status-pill status-info">
              <span>Path Length: {flowResult.path.length} Tiles</span>
            </div>
          )}
        </div>
      )}

      {/* 5x5 Responsive Grid Canvas */}
      <div className="grid-5x5-canvas">
        {grid.map((row) =>
          row.map((tile) => {
            const tileKey = `${tile.row}-${tile.col}`;
            const isReachable = flowResult.pathSet.has(tileKey);

            return (
              <Tile
                key={tileKey}
                tile={tile}
                isReachable={isReachable}
                onTileClick={handleTileClick}
              />
            );
          })
        )}
      </div>

      <div className="board-hint-bar">
        <div className="hint-text">
          <MousePointerClick size={15} />
          <span>
            {isWon
              ? 'Puzzle solved! Click "Play Again" to restart'
              : 'Click any tile to rotate arrow and extend the flow path'}
          </span>
        </div>
      </div>
    </div>
  );
}
