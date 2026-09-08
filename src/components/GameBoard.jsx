import React, { useState, useMemo, useEffect } from 'react';
import Tile from './Tile';
import { GRID_ROWS, GRID_COLS } from '../utils/constants';
import { createEmptyGrid, getNextClockwiseDirection } from '../utils/helpers';
import { calculateFlowPath } from '../algorithms/pathfinding';
import { MousePointerClick, RotateCcw, AlertCircle, Trophy, RefreshCw, Footprints } from 'lucide-react';
import '../css/GameBoard.css';

/**
 * Reusable GameBoard component managing matrix state, path traversal, win detection, and move counting.
 */
export default function GameBoard({ onMoveCountChange, onGameStatusChange }) {
  // Store board tiles in React state
  const [grid, setGrid] = useState(() => createEmptyGrid(GRID_ROWS, GRID_COLS));
  // Simple move counter state
  const [moveCount, setMoveCount] = useState(0);

  /**
   * Recalculate path traversal whenever grid state changes.
   * Win detection occurs when flowResult.reachedTarget is true.
   */
  const flowResult = useMemo(() => {
    return calculateFlowPath(grid);
  }, [grid]);

  const isWon = flowResult.reachedTarget;

  // Sync parent component callbacks if provided
  useEffect(() => {
    if (onMoveCountChange) onMoveCountChange(moveCount);
    if (onGameStatusChange) onGameStatusChange(isWon ? 'SOLVED' : 'IDLE');
  }, [moveCount, isWon, onMoveCountChange, onGameStatusChange]);

  /**
   * Click handler to rotate arrow clockwise (+90°) on regular tiles.
   * Increments move counter by 1 on every valid tile rotation.
   */
  const handleTileClick = (row, col) => {
    // Pause board tile interaction once the goal is reached
    if (isWon) return;

    let tileRotated = false;

    setGrid((prevGrid) =>
      prevGrid.map((r, rIdx) =>
        r.map((tile, cIdx) => {
          if (rIdx === row && cIdx === col) {
            // Ignore click on Start or Target tiles
            if (tile.isStart || tile.isTarget) return tile;

            tileRotated = true;

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

    // Increment move count if a valid tile was rotated
    if (tileRotated) {
      setMoveCount((prev) => prev + 1);
    }
  };

  /**
   * Resets all placed arrows back to initial empty grid and resets move counter.
   */
  const handleReset = () => {
    setGrid(createEmptyGrid(GRID_ROWS, GRID_COLS));
    setMoveCount(0);
  };

  return (
    <div className="game-board-container">
      <div className="board-header">
        <div className="board-title-group">
          <h2 className="board-title">Game Grid</h2>
          <span className="board-badge">{GRID_ROWS} × {GRID_COLS}</span>
        </div>

        {/* Move Counter Display at Top of Game */}
        <div className="move-counter-badge" title="Current Move Count">
          <Footprints size={15} style={{ color: 'var(--accent-cyan)' }} />
          <span>Moves:</span> {moveCount}
        </div>

        <button className="btn-text-reset" onClick={handleReset} title="Clear board & reset moves">
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
              <p className="completion-sub">Solved in {moveCount} {moveCount === 1 ? 'move' : 'moves'} ({flowResult.path.length} tiles)</p>
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
              ? `Puzzle solved in ${moveCount} moves! Click "Play Again" to restart`
              : 'Click any tile to rotate arrow and extend the flow path'}
          </span>
        </div>
      </div>
    </div>
  );
}
