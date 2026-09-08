import React from 'react';
import { ArrowUp, Play, Target } from 'lucide-react';
import { DIRECTION_ROTATION } from '../utils/constants';
import '../css/Tile.css';

/**
 * Reusable Tile component for individual grid cells on the Arrow Flow board.
 * 
 * @param {Object} props
 * @param {Object} props.tile Tile state object ({ row, col, arrow, isStart, isTarget })
 * @param {Function} props.onTileClick Callback when tile is clicked
 */
export default function Tile({ tile, onTileClick }) {
  const { row, col, arrow, isStart, isTarget } = tile;

  // Determine CSS classes for special styling
  const isSpecial = isStart || isTarget;
  let classNames = 'tile-button';
  if (isStart) classNames += ' is-start is-special';
  if (isTarget) classNames += ' is-target is-special';
  if (arrow) classNames += ' has-arrow';

  // Rotation angle for arrow icon (UP: 0deg, RIGHT: 90deg, DOWN: 180deg, LEFT: 270deg)
  const rotationAngle = arrow ? DIRECTION_ROTATION[arrow] : 0;

  return (
    <button
      className={classNames}
      onClick={() => onTileClick(row, col)}
      aria-label={`Tile (${row}, ${col})`}
    >
      {isStart ? (
        <>
          <Play className="tile-icon" size={22} fill="currentColor" />
          <span className="tile-label-badge">START</span>
        </>
      ) : isTarget ? (
        <>
          <Target className="tile-icon" size={24} />
          <span className="tile-label-badge">GOAL</span>
        </>
      ) : arrow ? (
        <div
          className="tile-arrow-icon"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <ArrowUp size={28} strokeWidth={2.5} />
        </div>
      ) : (
        <div className="tile-empty-dot" />
      )}
    </button>
  );
}
