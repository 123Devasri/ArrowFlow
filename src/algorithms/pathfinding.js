/**
 * Arrow Flow Pathfinding Utility
 * 
 * Traces the step-by-step flow from the Start tile following arrow directions.
 * Separated from UI components to maintain a clean modular architecture.
 */

import { DIRECTION_VECTORS } from '../utils/constants';
import { isValidCoordinate } from '../utils/helpers';

/**
 * Calculates the reachable path starting from (0, 0).
 * 
 * Stops when:
 * 1. Target tile is reached (success)
 * 2. Path leaves the board (out of bounds)
 * 3. Entering a tile without an arrow (no arrow)
 * 4. Entering a tile already in the current path (loop detected)
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row: 4, col: 4 }
 * @returns {Object} { path: Array<{row, col}>, pathSet: Set<string>, reachedTarget: boolean, stopReason: string }
 */
export function calculateFlowPath(
  grid,
  startPos = { row: 0, col: 0 },
  targetPos = { row: 4, col: 4 }
) {
  const path = [];
  const pathSet = new Set(); // Stores "row-col" strings for O(1) lookup
  let current = startPos;
  let reachedTarget = false;
  let stopReason = 'IDLE';

  // Safeguard loop iteration limit
  const maxSteps = grid.length * grid[0].length + 1;
  let stepCount = 0;

  while (current && stepCount < maxSteps) {
    stepCount++;
    const key = `${current.row}-${current.col}`;

    // Loop detection check
    if (pathSet.has(key)) {
      stopReason = 'LOOP';
      break;
    }

    // Add current tile to reachable path
    path.push({ row: current.row, col: current.col });
    pathSet.add(key);

    // Check if target is reached
    if (current.row === targetPos.row && current.col === targetPos.col) {
      reachedTarget = true;
      stopReason = 'TARGET_REACHED';
      break;
    }

    // Get current tile's arrow direction
    const tileData = grid[current.row]?.[current.col];
    const direction = tileData?.arrow;

    // Stop if tile has no arrow direction
    if (!direction) {
      stopReason = 'NO_ARROW';
      break;
    }

    // Calculate next tile coordinates based on arrow direction vector
    const vector = DIRECTION_VECTORS[direction];
    if (!vector) {
      stopReason = 'INVALID_DIRECTION';
      break;
    }

    const nextRow = current.row + vector.r;
    const nextCol = current.col + vector.c;

    // Stop if next step is out of grid bounds
    if (!isValidCoordinate(nextRow, nextCol, grid.length, grid[0].length)) {
      stopReason = 'OUT_OF_BOUNDS';
      break;
    }

    // Move to next tile
    current = { row: nextRow, col: nextCol };
  }

  return {
    path,
    pathSet,
    reachedTarget,
    stopReason,
  };
}
