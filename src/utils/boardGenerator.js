/**
 * Arrow Flow Puzzle Generator & Deterministic Daily Generator
 * 
 * Generates guaranteed solvable puzzle boards across Easy (4x4), Medium (5x5),
 * and Hard (6x6) difficulties with negative & positive movement entry costs (-3 to +5).
 * Includes deterministic daily puzzle generator seeded by calendar date.
 */

import { GRID_ROWS, GRID_COLS, DIRECTIONS, DIRECTION_ROTATION, DIFFICULTY_LEVELS } from './constants';
import { isValidCoordinate } from './helpers';

const DIRECTION_KEYS = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT];
const DIRECTION_OFFSETS = {
  [DIRECTIONS.UP]: { r: -1, c: 0 },
  [DIRECTIONS.RIGHT]: { r: 0, c: 1 },
  [DIRECTIONS.DOWN]: { r: 1, c: 0 },
  [DIRECTIONS.LEFT]: { r: 0, c: -1 },
};

/**
 * Deterministic PRNG seeded by integer (Mulberry32 algorithm)
 */
function createPRNG(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Converts a date string "YYYY-MM-DD" into an integer seed
 */
function hashDateString(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) + 1234567;
}

/**
 * Returns today's date string formatted as "YYYY-MM-DD"
 */
export function getTodayDateStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates day number of year for Daily Puzzle numbering
 */
export function getDailyPuzzleNumber(dateStr = getTodayDateStr()) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const start = new Date(y, 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getRandomInt(min, max, prng = Math.random) {
  const pFunc = typeof prng === 'function' ? prng : Math.random;
  return Math.floor(pFunc() * (max - min + 1)) + min;
}

function getRandomElement(arr, prng = Math.random) {
  const pFunc = typeof prng === 'function' ? prng : Math.random;
  return arr[Math.floor(pFunc() * arr.length)];
}

/**
 * Generates a random solution path tailored to difficulty complexity.
 */
function generateRandomSolutionPath(rows, cols, startPos, targetPos, difficultyKey = 'MEDIUM', prng = Math.random) {
  const pFunc = typeof prng === 'function' ? prng : Math.random;
  const path = [startPos];
  const visited = new Set([`${startPos.row}-${startPos.col}`]);
  let current = startPos;

  const maxSteps = rows * cols * 2;
  let steps = 0;

  const isEasy = difficultyKey === 'EASY';
  const isHard = difficultyKey === 'HARD';

  while (
    (current.row !== targetPos.row || current.col !== targetPos.col) &&
    steps < maxSteps
  ) {
    steps++;
    const neighbors = [];

    for (const dir of DIRECTION_KEYS) {
      const offset = DIRECTION_OFFSETS[dir];
      const nr = current.row + offset.r;
      const nc = current.col + offset.c;
      const key = `${nr}-${nc}`;

      if (isValidCoordinate(nr, nc, rows, cols) && !visited.has(key)) {
        const dist = Math.abs(nr - targetPos.row) + Math.abs(nc - targetPos.col);
        neighbors.push({ row: nr, col: nc, dir, dist });
      }
    }

    if (neighbors.length === 0) {
      const dr = Math.sign(targetPos.row - current.row);
      const dc = Math.sign(targetPos.col - current.col);

      let nr = current.row;
      let nc = current.col;

      if (dr !== 0 && pFunc() < 0.6) {
        nr += dr;
      } else if (dc !== 0) {
        nc += dc;
      } else {
        break;
      }

      current = { row: nr, col: nc };
      path.push(current);
      visited.add(`${nr}-${nc}`);
      continue;
    }

    if (isEasy) {
      neighbors.sort((a, b) => a.dist - b.dist);
    } else if (isHard) {
      if (pFunc() < 0.5 && neighbors.length > 1) {
        neighbors.sort((a, b) => b.dist - a.dist);
      } else {
        neighbors.sort((a, b) => a.dist - b.dist + (pFunc() - 0.5));
      }
    } else {
      neighbors.sort((a, b) => a.dist - b.dist + (pFunc() - 0.5));
    }

    const nextStep = neighbors[0];
    current = { row: nextStep.row, col: nextStep.col };
    path.push(current);
    visited.add(`${current.row}-${current.col}`);
  }

  return path;
}

/**
 * Generates a complete solvable grid matrix based on difficulty setting and algorithm mode.
 * Supports negative and positive movement entry costs (-3 to +5).
 * 
 * @param {number} rows Number of grid rows
 * @param {number} cols Number of grid columns
 * @param {string} difficultyKey 'EASY', 'MEDIUM', or 'HARD'
 * @param {string|Function} modeKeyOrPrng Algorithm mode string or PRNG function
 * @param {Function} customPrng Optional custom random function
 * @returns {Array<Array<Object>>} 2D array of initialized tile objects
 */
export function generateSolvableGrid(
  rows = GRID_ROWS,
  cols = GRID_COLS,
  difficultyKey = 'MEDIUM',
  modeKeyOrPrng = 'BFS',
  customPrng = null
) {
  let prng = Math.random;

  if (typeof modeKeyOrPrng === 'function') {
    prng = modeKeyOrPrng;
  } else if (typeof modeKeyOrPrng === 'string' && typeof customPrng === 'function') {
    prng = customPrng;
  }

  const startPos = { row: 0, col: 0 };
  const targetPos = { row: rows - 1, col: cols - 1 };

  // 1. Generate a valid solution path sequence
  const solutionPath = generateRandomSolutionPath(rows, cols, startPos, targetPos, difficultyKey, prng);

  // Map solution path steps to correct solution directions
  const solutionDirections = new Map();
  for (let i = 0; i < solutionPath.length - 1; i++) {
    const curr = solutionPath[i];
    const next = solutionPath[i + 1];

    let dir = DIRECTIONS.RIGHT;
    if (next.row < curr.row) dir = DIRECTIONS.UP;
    else if (next.row > curr.row) dir = DIRECTIONS.DOWN;
    else if (next.col < curr.col) dir = DIRECTIONS.LEFT;
    else if (next.col > curr.col) dir = DIRECTIONS.RIGHT;

    solutionDirections.set(`${curr.row}-${curr.col}`, dir);
  }

  // Cost pool supporting any positive movement entry cost (1 to 10)
  const possibleCosts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // 2. Build grid matrix with synchronized logical arrow directions & visual rotation degrees
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const isStart = r === startPos.row && c === startPos.col;
      const isTarget = r === targetPos.row && c === targetPos.col;
      const key = `${r}-${c}`;

      let initialArrow = null;
      let rotationDegrees = 0;

      const tileCost = isStart || isTarget ? 1 : getRandomElement(possibleCosts, prng);

      if (isStart) {
        initialArrow = solutionDirections.get(key) || DIRECTIONS.RIGHT;
        rotationDegrees = DIRECTION_ROTATION[initialArrow] || 0;
      } else if (isTarget) {
        initialArrow = null;
        rotationDegrees = 0;
      } else {
        const randomDir = getRandomElement(DIRECTION_KEYS, prng);
        initialArrow = randomDir;
        rotationDegrees = DIRECTION_ROTATION[randomDir] || 0;
      }

      row.push({
        row: r,
        col: c,
        arrow: initialArrow,
        rotationDegrees,
        cost: tileCost,
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
 * Generates a deterministic daily puzzle board seeded by calendar date.
 * 
 * @param {string} dateStr Format "YYYY-MM-DD"
 * @returns {Array<Array<Object>>} Deterministic solvable 5x5 grid
 */
export function generateDailyGrid(dateStr = getTodayDateStr()) {
  const seed = hashDateString(dateStr);
  const prng = createPRNG(seed);
  return generateSolvableGrid(5, 5, 'MEDIUM', 'BFS', prng);
}
