/**
 * Dijkstra's Shortest Path Algorithm for Arrow Flow
 * 
 * Models the board as a Weighted Directed Graph G = (V, E, w):
 * - Vertices V: Each valid grid tile coordinate ("row-col")
 * - Directed Edges E: Outgoing arrow directions connecting adjacent tiles
 * - Edge Weight w: Movement cost of entering the destination tile (1, 2, or 3)
 * 
 * Computes the absolute minimum-cost path from Start to Target.
 */

import { buildGraphFromGrid } from './bfs';

/**
 * Executes Dijkstra's algorithm to find the minimum-cost path from Start to Target.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row, col }
 * @returns {Object} { isReachable: boolean, path: Array<{row, col}>, pathSet: Set<string>, optimalCost: number, visitedCount: number, nodesExplored: string[] }
 */
export function solveDijkstra(
  grid,
  startPos = { row: 0, col: 0 },
  targetPos = { row: 4, col: 4 }
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const startKey = `${startPos.row}-${startPos.col}`;
  const targetKey = `${targetPos.row}-${targetPos.col}`;

  // 1. Build Adjacency List graph representation (shared graph builder)
  const graph = buildGraphFromGrid(grid);

  // 2. Initialize Dijkstra data structures
  const distMap = new Map();     // Distance map: vertexKey -> min path cost
  const parentMap = new Map();   // Parent pointers for shortest path reconstruction
  const visited = new Set();     // Settled vertices set
  const nodesExplored = [];

  // Initialize all vertex distances to Infinity, and Start to 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      distMap.set(`${r}-${c}`, Infinity);
    }
  }
  distMap.set(startKey, 0);

  let targetReached = false;

  // 3. Main Dijkstra Loop: Extract unvisited vertex with minimum tentative distance
  while (visited.size < rows * cols) {
    // Find unvisited vertex with smallest distMap value
    let currentKey = null;
    let minDistance = Infinity;

    for (const [key, dist] of distMap.entries()) {
      if (!visited.has(key) && dist < minDistance) {
        minDistance = dist;
        currentKey = key;
      }
    }

    // Stop if no reachable unvisited vertices remain
    if (!currentKey || minDistance === Infinity) {
      break;
    }

    // Mark current vertex as visited/settled
    visited.add(currentKey);
    nodesExplored.push(currentKey);

    // Stop if Target is settled
    if (currentKey === targetKey) {
      targetReached = true;
      break;
    }

    // Relax all outgoing neighbors
    const neighbors = graph.get(currentKey) || [];
    for (const neighborKey of neighbors) {
      if (!visited.has(neighborKey)) {
        // Get movement cost of the destination tile
        const [nrStr, ncStr] = neighborKey.split('-');
        const nr = parseInt(nrStr, 10);
        const nc = parseInt(ncStr, 10);
        const tileCost = grid[nr]?.[nc]?.cost || 1;

        // Calculate tentative distance
        const newDist = distMap.get(currentKey) + tileCost;

        // If a shorter path to neighbor is found, update distance and parent
        if (newDist < distMap.get(neighborKey)) {
          distMap.set(neighborKey, newDist);
          parentMap.set(neighborKey, currentKey);
        }
      }
    }
  }

  // 4. Reconstruct optimal minimum-cost path if Target was reached
  const path = [];
  const pathSet = new Set();
  let optimalCost = 0;

  if (targetReached) {
    optimalCost = distMap.get(targetKey);
    let curr = targetKey;

    while (curr) {
      const [rStr, cStr] = curr.split('-');
      path.unshift({ row: parseInt(rStr, 10), col: parseInt(cStr, 10) });
      pathSet.add(curr);
      curr = parentMap.get(curr);
    }
  }

  return {
    isReachable: targetReached,
    path,
    pathSet,
    optimalCost: targetReached ? optimalCost : Infinity,
    visitedCount: visited.size,
    nodesExplored,
    totalVertices: rows * cols,
  };
}
