/**
 * Arrow Flow Constants
 * Beginners-friendly configuration file for grid sizes, directions, and game states.
 */

// Default Grid Dimensions
export const GRID_ROWS = 6;
export const GRID_COLS = 6;

// Arrow Direction Enum
export const DIRECTIONS = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

// Direction vector offsets (row change, col change)
export const DIRECTION_VECTORS = {
  [DIRECTIONS.UP]: { r: -1, c: 0 },
  [DIRECTIONS.RIGHT]: { r: 0, c: 1 },
  [DIRECTIONS.DOWN]: { r: 1, c: 0 },
  [DIRECTIONS.LEFT]: { r: 0, c: -1 },
};

// Game Status Enum
export const GAME_STATUS = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  SOLVED: 'SOLVED',
  FAILED: 'FAILED',
};
