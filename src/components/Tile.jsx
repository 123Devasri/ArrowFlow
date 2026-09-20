import React from 'react';
import { ArrowUp, Target, CheckCircle2 } from 'lucide-react';
import '../css/Tile.css';

/**
 * Reusable Tile component for individual grid cells on the Arrow Flow board.
 * 
 * @param {Object} props
 * @param {Object} props.tile Tile state object ({ row, col, arrow, rotationDegrees, cost, isStart, isTarget })
 * @param {boolean} props.isReachable Whether this tile is in the active flow path
 * @param {boolean} props.isVisited Whether this tile is a visited step in the player's valid path
 * @param {boolean} props.isNextTile Whether this tile is the immediate next tile at the tip of the player's path
 * @param {Function} props.onTileClick Callback when tile is clicked
 */
export default function Tile({ tile, isReachable, isVisited, isNextTile, onTileClick }) {
  const { row, col, arrow, rotationDegrees, cost = 1, isStart, isTarget } = tile;

  // Determine CSS classes for special styling
  let classNames = 'tile-button';
  if (isStart) classNames += ' is-start is-special';
  if (isTarget) classNames += ' is-target is-special';
  if (arrow) classNames += ' has-arrow';
  if (isVisited) classNames += ' is-visited is-reachable';
  if (isNextTile) classNames += ' is-next-tile is-reachable';
  if (isReachable && !isVisited && !isNextTile && !isStart && !isTarget) classNames += ' is-reachable';

  return (
    <button
      className={classNames}
      onClick={() => onTileClick(row, col)}
      aria-label={`Tile (${row}, ${col})`}
    >
      {/* Tile Movement Cost Badge */}
      {!isStart && !isTarget && (
        <span
          className={`tile-cost-badge cost-${cost}`}
          title={`Movement Entry Cost: +${cost}`}
        >
          +{cost}
        </span>
      )}

      {isStart ? (
        <>
          <div
            className="tile-arrow-icon"
            style={{ transform: `rotate(${rotationDegrees}deg)`, color: 'var(--accent-emerald)' }}
          >
            <ArrowUp size={24} strokeWidth={2.8} />
          </div>
          <span className="tile-label-badge" style={{ color: 'var(--accent-emerald)', marginTop: '1px' }}>START</span>
        </>
      ) : isTarget ? (
        <>
          {isReachable ? (
            <CheckCircle2 className="tile-icon" size={24} />
          ) : (
            <Target className="tile-icon" size={24} />
          )}
          <span className="tile-label-badge">{isReachable ? 'GOAL!' : 'GOAL'}</span>
        </>
      ) : arrow ? (
        <div
          className="tile-arrow-icon"
          style={{ transform: `rotate(${rotationDegrees}deg)` }}
        >
          <ArrowUp size={28} strokeWidth={2.5} />
        </div>
      ) : (
        <div className="tile-empty-dot" />
      )}
    </button>
  );
}
