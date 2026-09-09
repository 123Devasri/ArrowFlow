/**
 * Arrow Flow Puzzle Generator
 * 
 * Generates guaranteed solvable puzzle boards across Easy (4x4), Medium (5x5),
 * and Hard (6x6) difficulties with weighted tile movement costs (1, 2, 3).
 */

import { GRID_ROWS, GRID_COLS, DIRECTIONS, DIRECTION_ROTATION } from './constants';
import { isValidCoordinate } from './helpers';

const DIRECTION_KEYS = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT];
const DIRECTION_OFFSETS = {
  [DIRECTIONS.UP]: { r: -1, c: 0 },
  [DIRECTIONS.RIGHT]: { r: 0, c: 1 },
  [DIRECTIONS.DOWN]: { r: 1, c: 0 },
  [DIRECTIONS.LEFT]: { r: 0, c: -1 },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random solution path tailored to difficulty complexity.
 */
function generateRandomSolutionPath(rows, cols, startPos, targetPos, difficultyKey = 'MEDIUM') {
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

    if (isEasy) {
      neighbors.sort((a, b) => a.dist - b.dist);
    } else if (isHard) {
      if (Math.random() < 0.5 && neighbors.length > 1) {
        neighbors.sort((a, b) => b.dist - a.dist);
      } else {
        neighbors.sort((a, b) => a.dist - b.dist + (Math.random() - 0.5));
      }
    } else {
      neighbors.sort((a, b) => a.dist - b.dist + (Math.random() - 0.5));
    }

    const nextStep = neighbors[0];
    current = { row: nextStep.row, col: nextStep.col };
    path.push(current);
    visited.add(`${current.row}-${current.col}`);
  }

  return path;
}

/**
 * Generates a complete solvable grid matrix with weighted tile movement costs (1, 2, 3).
 * 
 * @param {number} rows Number of grid rows
 * @param {number} cols Number of grid columns
 * @param {string} difficultyKey 'EASY', 'MEDIUM', or 'HARD'
 * @returns {Array<Array<Object>>} 2D array of initialized tile objects
 */
export function generateSolvableGrid(
  rows = GRID_ROWS,
  cols = GRID_COLS,
  difficultyKey = 'MEDIUM'
) {
  const startPos = { row: 0, col: 0 };
  const targetPos = { row: rows - 1, col: cols - 1 };

  // 1. Generate a valid solution path sequence
  const solutionPath = generateRandomSolutionPath(rows, cols, startPos, targetPos, difficultyKey);

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

  // 2. Build grid matrix with weighted movement costs
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const isStart = r === startPos.row && c === startPos.col;
      const isTarget = r === targetPos.row && c === targetPos.col;
      const key = `${r}-${c}`;

      let initialArrow = null;
      let rotationDegrees = 0;

      // Assign movement cost (1, 2, or 3)
      // Weighted distribution: 50% cost 1, 30% cost 2, 20% cost 3
      const randCost = Math.random();
      const tileCost = isStart || isTarget ? 1 : randCost < 0.5 ? 1 : randCost < 0.8 ? 2 : 3;

      if (isStart) {
        initialArrow = solutionDirections.get(key) || DIRECTIONS.RIGHT;
        rotationDegrees = DIRECTION_ROTATION[initialArrow] || 0;
      } else if (isTarget) {
        initialArrow = null;
        rotationDegrees = 0;
      } else {
        const randomDir = getRandomElement(DIRECTION_KEYS);
        initialArrow = randomDir;

        const randomRotations = getRandomInt(0, 3);
        rotationDegrees = (DIRECTION_ROTATION[randomDir] + randomRotations * 90) % 360;
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
