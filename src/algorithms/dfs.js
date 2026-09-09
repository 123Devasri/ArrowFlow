/**
 * Depth-First Search (DFS) Algorithm for Arrow Flow
 * 
 * Uses the same directed graph representation G = (V, E) as BFS.
 * Explores graph branches as deep as possible using a LIFO Stack before backtracking.
 * 
 * Kept separate from bfs.js to allow easy comparison between search strategies.
 */

import { buildGraphFromGrid } from './bfs';

/**
 * Executes Depth-First Search (DFS) to determine target reachability.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row, col }
 * @returns {Object} { isReachable: boolean, path: Array<{row, col}>, pathSet: Set<string>, visitedCount: number, nodesExplored: string[] }
 */
export function solveDFS(
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

  // 2. Initialize DFS data structures (LIFO Stack)
  const stack = [startKey];
  const visited = new Set([startKey]);
  const parentMap = new Map();
  const nodesExplored = [];

  let targetFound = false;

  // 3. DFS Traversal Loop (LIFO Stack)
  while (stack.length > 0) {
    const currentKey = stack.pop(); // LIFO stack pop
    nodesExplored.push(currentKey);

    // Stop if target is reached
    if (currentKey === targetKey) {
      targetFound = true;
      break;
    }

    const neighbors = graph.get(currentKey) || [];
    for (const neighborKey of neighbors) {
      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        parentMap.set(neighborKey, currentKey);
        stack.push(neighborKey); // Push to LIFO stack
      }
    }
  }

  // 4. Reconstruct path if target was reached
  const path = [];
  const pathSet = new Set();

  if (targetFound) {
    let curr = targetKey;
    while (curr) {
      const [rStr, cStr] = curr.split('-');
      path.unshift({ row: parseInt(rStr, 10), col: parseInt(cStr, 10) });
      pathSet.add(curr);
      curr = parentMap.get(curr);
    }
  }

  return {
    isReachable: targetFound,
    path,
    pathSet,
    visitedCount: visited.size,
    nodesExplored,
    totalVertices: rows * cols,
    graphSize: graph.size,
  };
}
