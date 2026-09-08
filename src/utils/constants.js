/**
 * Arrow Flow Constants
 * Beginners-friendly configuration file for grid sizes, directions, and game states.
 */

// 5x5 Grid Dimensions
export const GRID_ROWS = 5;
export const GRID_COLS = 5;

// Arrow Direction Enum
export const DIRECTIONS = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

// Clockwise Direction Cycle Order
export const DIRECTION_CYCLE = [
  DIRECTIONS.UP,
  DIRECTIONS.RIGHT,
  DIRECTIONS.DOWN,
  DIRECTIONS.LEFT,
];

// Base Rotation angles in degrees for each direction
export const DIRECTION_ROTATION = {
  [DIRECTIONS.UP]: 0,
  [DIRECTIONS.RIGHT]: 90,
  [DIRECTIONS.DOWN]: 180,
  [DIRECTIONS.LEFT]: 270,
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
