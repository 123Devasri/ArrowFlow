/**
 * Breadth-First Search (BFS) / Shortest-Move Algorithm for Arrow Flow
 * 
 * Calculates total moves including both tile rotation actions and path step transitions.
 * Computes path metrics for current arrows and true minimum moves (rotations + steps) for full board.
 */

import { buildGraphFromGrid, buildFullGridGraph } from './graph';

function runShortestMoveGraph(graph, grid, startPos, targetPos, isFullGraph = false) {
  const rows = grid.length;
  const cols = grid[0].length;
  const startKey = `${startPos.row}-${startPos.col}`;
  const targetKey = `${targetPos.row}-${targetPos.col}`;

  const distMap = new Map();
  const parentMap = new Map();
  const visited = new Set();
  const nodesExplored = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      distMap.set(`${r}-${c}`, Infinity);
    }
  }
  distMap.set(startKey, 0);

  let targetFound = false;

  while (visited.size < rows * cols) {
    let currentKey = null;
    let minDist = Infinity;

    for (const [key, d] of distMap.entries()) {
      if (!visited.has(key) && d < minDist) {
        minDist = d;
        currentKey = key;
      }
    }

    if (!currentKey || minDist === Infinity) {
      break;
    }

    visited.add(currentKey);
    nodesExplored.push(currentKey);

    if (currentKey === targetKey) {
      targetFound = true;
      break;
    }

    const neighbors = graph.get(currentKey) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.key)) {
        const moveWeight = isFullGraph ? (neighbor.moveWeight !== undefined ? neighbor.moveWeight : 1) : 1;
        const newDist = distMap.get(currentKey) + moveWeight;

        if (newDist < distMap.get(neighbor.key)) {
          distMap.set(neighbor.key, newDist);
          parentMap.set(neighbor.key, currentKey);
        }
      }
    }
  }

  const path = [];
  const pathSet = new Set();

  if (targetFound) {
    let curr = targetKey;
    const visitedCycle = new Set();

    while (curr && !visitedCycle.has(curr)) {
      visitedCycle.add(curr);
      const [rStr, cStr] = curr.split('-');
      path.unshift({ row: parseInt(rStr, 10), col: parseInt(cStr, 10) });
      pathSet.add(curr);
      curr = parentMap.get(curr);
    }
  }

  return {
    targetFound,
    path,
    pathSet,
    totalMoves: targetFound ? distMap.get(targetKey) : Infinity,
    visited,
    nodesExplored,
    totalVertices: rows * cols,
  };
}

/**
 * Executes Breadth-First Search (BFS) to find minimum total-move path (rotations + steps).
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row, col }
 * @returns {Object} Algorithm result object
 */
export function solveBFS(
  grid,
  initialGrid = null,
  startPos = { row: 0, col: 0 },
  targetPos = { row: 4, col: 4 }
) {
  const baseGrid = initialGrid || grid;
  const currentGraph = buildGraphFromGrid(grid);
  const currentRes = runShortestMoveGraph(currentGraph, grid, startPos, targetPos, false);

  const fullGraph = buildFullGridGraph(baseGrid);
  const optimalRes = runShortestMoveGraph(fullGraph, baseGrid, startPos, targetPos, true);

  return {
    algorithm: 'BFS',
    goalLabel: 'Minimum Moves',
    description: 'Finds the path requiring the fewest total moves (rotations + steps).',
    isReachable: currentRes.targetFound,
    path: currentRes.path,
    pathSet: currentRes.pathSet,
    moves: currentRes.targetFound ? Math.max(0, currentRes.path.length - 1) : 0,
    optimalBoardMoves: optimalRes.targetFound ? optimalRes.totalMoves : 0,
    visitedCount: currentRes.visited.size,
    nodesExplored: currentRes.nodesExplored,
    totalVertices: grid.length * grid[0].length,
  };
}
