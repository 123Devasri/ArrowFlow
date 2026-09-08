/**
 * Arrow Flow Helper Utilities
 * Helper functions for grid generation and coordinate validation.
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
        // Start tile points RIGHT initially to start the flow path
        arrow: isStart ? DIRECTIONS.RIGHT : null,
        rotationDegrees: 0,
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
 * Checks if a given coordinate is within grid bounds.
 */
export function isValidCoordinate(r, c, rows = GRID_ROWS, cols = GRID_COLS) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}
