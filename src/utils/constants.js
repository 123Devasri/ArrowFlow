/**
 * Arrow Flow Constants
 * Beginners-friendly configuration file for grid sizes, directions, game states, and difficulties.
 */

// Difficulty Configurations
export const DIFFICULTY_LEVELS = {
  EASY: {
    key: 'EASY',
    label: 'Easy',
    rows: 4,
    cols: 4,
    description: '4×4 board with simple direct paths',
  },
  MEDIUM: {
    key: 'MEDIUM',
    label: 'Medium',
    rows: 5,
    cols: 5,
    description: '5×5 board with balanced paths & misleading arrows',
  },
  HARD: {
    key: 'HARD',
    label: 'Hard',
    rows: 6,
    cols: 6,
    description: '6×6 board with complex winding paths',
  },
};

// Default Grid Dimensions (Medium fallback)
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
