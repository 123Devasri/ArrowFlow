/**
 * Perfect Route (DFS Mode) Algorithm for Arrow Flow
 * 
 * Evaluates both Minimum Cost AND Minimum Moves for a Perfect Route.
 * Computes dual-criteria metrics (Cost + Moves) for player path
 * and calculates the true optimal Perfect Route for the full board matrix.
 */

import { buildGraphFromGrid, buildFullGridGraph } from './graph';

/**
 * Runs dual-criteria shortest path (Min Cost + Min Moves) on a graph.
 */
function runPerfectRouteOnGraph(graph, grid, startPos, targetPos, isFullGraph = false) {
  const rows = grid.length;
  const cols = grid[0].length;
  const startKey = `${startPos.row}-${startPos.col}`;
  const targetKey = `${targetPos.row}-${targetPos.col}`;

  const distCost = new Map();
  const distMoves = new Map();
  const parentMap = new Map();
  const visited = new Set();
  const nodesExplored = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r}-${c}`;
      distCost.set(key, Infinity);
      distMoves.set(key, Infinity);
    }
  }
  distCost.set(startKey, 0);
  distMoves.set(startKey, 0);

  let targetReached = false;

  while (visited.size < rows * cols) {
    let currentKey = null;
    let minCost = Infinity;
    let minMoves = Infinity;

    for (const [key, costVal] of distCost.entries()) {
      if (!visited.has(key)) {
        const movesVal = distMoves.get(key);
        if (
          costVal < minCost ||
          (costVal === minCost && movesVal < minMoves)
        ) {
          minCost = costVal;
          minMoves = movesVal;
          currentKey = key;
        }
      }
    }

    if (!currentKey || minCost === Infinity) {
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
        const moveWeight = isFullGraph ? (neighbor.moveWeight !== undefined ? neighbor.moveWeight : 1) : 1;
        const newCost = distCost.get(currentKey) + neighbor.cost;
        const newMoves = distMoves.get(currentKey) + moveWeight;

        const oldCost = distCost.get(neighbor.key);
        const oldMoves = distMoves.get(neighbor.key);

        if (
          newCost < oldCost ||
          (newCost === oldCost && newMoves < oldMoves)
        ) {
          distCost.set(neighbor.key, newCost);
          distMoves.set(neighbor.key, newMoves);
          parentMap.set(neighbor.key, currentKey);
        }
      }
    }
  }

  const path = [];
  const pathSet = new Set();

  if (targetReached) {
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
    targetReached,
    path,
    pathSet,
    cost: targetReached ? distCost.get(targetKey) : Infinity,
    moves: targetReached ? distMoves.get(targetKey) : Infinity,
    visited,
    nodesExplored,
  };
}

/**
 * Executes Perfect Route (DFS Mode) finding optimal route balancing both min cost & min moves.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row, col }
 * @returns {Object} Algorithm result object
 */
export function solveDFS(
  grid,
  initialGrid = null,
  startPos = { row: 0, col: 0 },
  targetPos = { row: 4, col: 4 }
) {
  const baseGrid = initialGrid || grid;
  const currentGraph = buildGraphFromGrid(grid);
  const currentRes = runPerfectRouteOnGraph(currentGraph, grid, startPos, targetPos, false);

  const fullGraph = buildFullGridGraph(baseGrid);
  const optimalRes = runPerfectRouteOnGraph(fullGraph, baseGrid, startPos, targetPos, true);

  return {
    algorithm: 'DFS',
    strategyLabel: 'Perfect Route',
    goalLabel: 'Min Cost & Min Moves',
    description: 'Calculates both minimum cost and minimum moves for a Perfect Route.',
    isReachable: currentRes.targetReached,
    path: currentRes.path,
    pathSet: currentRes.pathSet,
    moves: currentRes.targetReached ? Math.max(0, currentRes.path.length - 1) : 0,
    currentCost: currentRes.targetReached ? currentRes.cost : Infinity,
    optimalBoardCost: optimalRes.targetReached ? optimalRes.cost : Infinity,
    optimalBoardMoves: optimalRes.targetReached ? optimalRes.moves : 0,
    visitedCount: currentRes.nodesExplored.length,
    nodesExplored: currentRes.nodesExplored,
    totalVertices: grid.length * grid[0].length,
  };
}
