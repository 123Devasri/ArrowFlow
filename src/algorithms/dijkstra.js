/**
 * Dijkstra's Shortest Path Algorithm for Arrow Flow
 * 
 * Weighted path challenge.
 * Each tile has an entry cost (1 to 8+).
 * Computes path metrics for current arrows and true optimal minimum cost for full board.
 * Includes loop guards on path reconstruction to prevent browser freezes.
 */

import { buildGraphFromGrid, buildFullGridGraph } from './graph';

function runDijkstraOnGraph(graph, grid, startPos, targetPos) {
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

  let targetReached = false;

  while (visited.size < rows * cols) {
    let currentKey = null;
    let minDistance = Infinity;

    for (const [key, dist] of distMap.entries()) {
      if (!visited.has(key) && dist < minDistance) {
        minDistance = dist;
        currentKey = key;
      }
    }

    if (!currentKey || minDistance === Infinity) {
      break;
    }

    visited.add(currentKey);
    nodesExplored.push(currentKey);

    if (currentKey === targetKey) {
      targetReached = true;
      break;
    }

    const neighbors = graph.get(currentKey) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.key)) {
        const newDist = distMap.get(currentKey) + neighbor.cost;

        if (newDist < distMap.get(neighbor.key)) {
          distMap.set(neighbor.key, newDist);
          parentMap.set(neighbor.key, currentKey);
        }
      }
    }
  }

  const path = [];
  const pathSet = new Set();
  let cost = 0;

  if (targetReached) {
    cost = distMap.get(targetKey);
    let curr = targetKey;
    const visitedCycle = new Set();

    // Safeguarded path reconstruction loop prevents infinite loops
    while (curr && !visitedCycle.has(curr)) {
      visitedCycle.add(curr);
      const [rStr, cStr] = curr.split('-');
      path.unshift({ row: parseInt(rStr, 10), col: parseInt(cStr, 10) });
      pathSet.add(curr);
      curr = parentMap.get(curr);
    }
  }

  return {
    targetReached,
    path,
    pathSet,
    cost,
    visited,
    nodesExplored,
  };
}

/**
 * Executes Dijkstra's algorithm to find minimum-cost path.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row, col }
 * @returns {Object} { algorithm: 'DIJKSTRA', goalLabel: 'Minimum Total Cost', isReachable: boolean, path: Array, optimalCost: number, optimalBoardCost: number, nodesExplored: Array }
 */
export function solveDijkstra(
  grid,
  initialGrid = null,
  startPos = { row: 0, col: 0 },
  targetPos = { row: 4, col: 4 }
) {
  const baseGrid = initialGrid || grid;
  const currentGraph = buildGraphFromGrid(grid);
  const currentRes = runDijkstraOnGraph(currentGraph, grid, startPos, targetPos);

  const fullGraph = buildFullGridGraph(baseGrid);
  const optimalRes = runDijkstraOnGraph(fullGraph, baseGrid, startPos, targetPos);

  return {
    algorithm: 'DIJKSTRA',
    goalLabel: 'Minimum Total Cost',
    description: 'Finds the path with the lowest total cost.',
    isReachable: currentRes.targetReached,
    path: currentRes.path,
    pathSet: currentRes.pathSet,
    currentCost: currentRes.targetReached ? currentRes.cost : Infinity,
    optimalCost: optimalRes.targetReached ? optimalRes.cost : Infinity,
    optimalBoardCost: optimalRes.targetReached ? optimalRes.cost : Infinity,
    optimalBoardMoves: optimalRes.targetReached ? Math.max(0, optimalRes.path.length - 1) : 0,
    moves: currentRes.targetReached ? Math.max(0, currentRes.path.length - 1) : 0,
    visitedCount: currentRes.nodesExplored.length,
    nodesExplored: currentRes.nodesExplored,
    totalVertices: grid.length * grid[0].length,
  };
}
