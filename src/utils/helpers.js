/**
 * Arrow Flow Helper Utilities
 * Helper functions for grid generation and coordinate validation.
 */
import { GRID_ROWS, GRID_COLS } from './constants';

/**
 * Creates an empty grid array for initialization.
 * @returns {Array<Array<Object>>} 2D array representing grid cells.
 */
export function createEmptyGrid(rows = GRID_ROWS, cols = GRID_COLS) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        arrow: null, // Direction string when placed
        isStart: r === 0 && c === 0,
        isEnd: r === rows - 1 && c === cols - 1,
        visited: false,
      });
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Checks if a given coordinate is within grid bounds.
 */
export function isValidCoordinate(r, c, rows = GRID_ROWS, cols = GRID_COLS) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}
