/**
 * Arrow Flow Puzzle Generator
 * 
 * Generates a guaranteed solvable puzzle board on a 5x5 grid.
 * Constructs a valid path from Start (0, 0) to Target (4, 4), scrambles
 * arrow directions, and randomizes off-path tiles.
 */

import { GRID_ROWS, GRID_COLS, DIRECTIONS, DIRECTION_CYCLE, DIRECTION_ROTATION } from './constants';
import { isValidCoordinate } from './helpers';

/**
 * Direction vectors for neighbor exploration
 */
const DIRECTION_KEYS = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT];
const DIRECTION_OFFSETS = {
  [DIRECTIONS.UP]: { r: -1, c: 0 },
  [DIRECTIONS.RIGHT]: { r: 0, c: 1 },
  [DIRECTIONS.DOWN]: { r: 1, c: 0 },
  [DIRECTIONS.LEFT]: { r: 0, c: -1 },
};

/**
 * Generates a random integer between min and max inclusive.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Picks a random element from an array.
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random valid path from start to target using a random walk biased towards target.
 */
function generateRandomSolutionPath(rows, cols, startPos, targetPos) {
  const path = [startPos];
  const visited = new Set([`${startPos.row}-${startPos.col}`]);
  let current = startPos;

  // Max steps limit to avoid infinite loops
  const maxSteps = rows * cols * 2;
  let steps = 0;

  while (
    (current.row !== targetPos.row || current.col !== targetPos.col) &&
    steps < maxSteps
  ) {
    steps++;
    const neighbors = [];

    // Find valid unvisited neighbor coordinates
    for (const dir of DIRECTION_KEYS) {
      const offset = DIRECTION_OFFSETS[dir];
      const nr = current.row + offset.r;
      const nc = current.col + offset.c;
      const key = `${nr}-${nc}`;

      if (isValidCoordinate(nr, nc, rows, cols) && !visited.has(key)) {
        // Calculate Manhattan distance to target to bias movement towards goal
        const dist = Math.abs(nr - targetPos.row) + Math.abs(nc - targetPos.col);
        neighbors.push({ row: nr, col: nc, dir, dist });
      }
    }

    // If trapped with no unvisited neighbors, backtrack or force movement towards target
    if (neighbors.length === 0) {
      // Force step towards target ignoring visited
      const dr = Math.sign(targetPos.row - current.row);
      const dc = Math.sign(targetPos.col - current.col);

      let nr = current.row;
      let nc = current.col;
      let dir = DIRECTIONS.RIGHT;

      if (dr !== 0 && Math.random() < 0.6) {
        nr += dr;
        dir = dr > 0 ? DIRECTIONS.DOWN : DIRECTIONS.UP;
      } else if (dc !== 0) {
        nc += dc;
        dir = dc > 0 ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT;
      } else {
        break;
      }

      current = { row: nr, col: nc };
      path.push(current);
      visited.add(`${nr}-${nc}`);
      continue;
    }

    // Sort neighbors by distance to goal with random variation
    neighbors.sort((a, b) => a.dist - b.dist + (Math.random() - 0.5));

    // Select next step
    const nextStep = neighbors[0];
    current = { row: nextStep.row, col: nextStep.col };
    path.push(current);
    visited.add(`${current.row}-${current.col}`);
  }

  return path;
}

/**
 * Generates a complete 5x5 solvable grid matrix.
 * 
 * @param {number} rows Number of grid rows (default 5)
 * @param {number} cols Number of grid columns (default 5)
 * @returns {Array<Array<Object>>} 2D array of initialized tile objects
 */
export function generateSolvableGrid(rows = GRID_ROWS, cols = GRID_COLS) {
  const startPos = { row: 0, col: 0 };
  const targetPos = { row: rows - 1, col: cols - 1 };

  // 1. Generate a valid solution path sequence
  const solutionPath = generateRandomSolutionPath(rows, cols, startPos, targetPos);

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

  // 2. Build grid matrix
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const isStart = r === startPos.row && c === startPos.col;
      const isTarget = r === targetPos.row && c === targetPos.col;
      const key = `${r}-${c}`;

      let initialArrow = null;
      let rotationDegrees = 0;

      if (isStart) {
        // Start tile points along the solution path direction
        initialArrow = solutionDirections.get(key) || DIRECTIONS.RIGHT;
        rotationDegrees = DIRECTION_ROTATION[initialArrow] || 0;
      } else if (isTarget) {
        initialArrow = null;
        rotationDegrees = 0;
      } else {
        // Regular tile: assign random initial direction
        const randomDir = getRandomElement(DIRECTION_KEYS);
        initialArrow = randomDir;

        // Scramble initial direction randomly
        const randomRotations = getRandomInt(0, 3);
        rotationDegrees = (DIRECTION_ROTATION[randomDir] + randomRotations * 90) % 360;
      }

      row.push({
        row: r,
        col: c,
        arrow: initialArrow,
        rotationDegrees,
        isStart,
        isTarget,
        visited: false,
      });
    }
    grid.push(row);
  }

  return grid;
}
