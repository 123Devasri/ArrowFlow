/**
 * Arrow Flow Helper Utilities
 * Helper functions for grid generation, coordinate validation, path cost calculations, and time formatting.
 */
import { GRID_ROWS, GRID_COLS, DIRECTIONS, DIRECTION_CYCLE } from './constants';

/**
 * Creates an initial 5x5 grid matrix.
 * Set Start tile at (0, 0) pointing RIGHT and Target tile at (4, 4).
 * @returns {Array<Array<Object>>} 2D array representing grid tiles.
 */
export function createEmptyGrid(rows = GRID_ROWS, cols = GRID_COLS) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const isStart = r === 0 && c === 0;
      const isTarget = r === rows - 1 && c === cols - 1;

      row.push({
        row: r,
        col: c,
        arrow: isStart ? DIRECTIONS.RIGHT : null,
        rotationDegrees: 0,
        cost: 1, // Default movement cost
        isStart,
        isTarget,
        visited: false,
      });
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Calculates total movement cost along a path sequence.
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Array<{row, col}>} path Path coordinate sequence
 * @returns {number} Sum of movement costs along the path
 */
export function calculatePathCost(grid, path) {
  if (!grid || !path || path.length <= 1) return 0;
  let totalCost = 0;

  // Sum cost for every tile after start in the path
  for (let i = 1; i < path.length; i++) {
    const tilePos = path[i];
    const tile = grid[tilePos.row]?.[tilePos.col];
    if (tile) {
      totalCost += tile.cost || 1;
    }
  }

  return totalCost;
}

/**
 * Calculates the next direction in clockwise order (UP -> RIGHT -> DOWN -> LEFT -> UP).
 * Also handles initial click on an empty tile (defaults to UP).
 */
export function getNextClockwiseDirection(currentDirection) {
  if (!currentDirection) return DIRECTIONS.UP;
  const currentIndex = DIRECTION_CYCLE.indexOf(currentDirection);
  const nextIndex = (currentIndex + 1) % DIRECTION_CYCLE.length;
  return DIRECTION_CYCLE[nextIndex];
}

/**
 * Formats seconds into MM:SS string display (e.g. 65 -> "01:05").
 */
export function formatTime(totalSeconds = 0) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Checks if a given coordinate is within grid bounds.
 */
export function isValidCoordinate(r, c, rows = GRID_ROWS, cols = GRID_COLS) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}
