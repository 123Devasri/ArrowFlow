/**
 * Breadth-First Search (BFS) Algorithm for Arrow Flow
 * 
 * Models the Arrow Flow board as a directed graph G = (V, E):
 * - Vertices V: Each valid grid tile coordinate ("row-col")
 * - Directed Edges E: Outgoing arrow directions connecting adjacent tiles
 * 
 * Traverses graph using a queue (FIFO) to determine if Target is reachable from Start,
 * returning the shortest path and graph search statistics. Independent from React UI.
 */

import { DIRECTION_VECTORS } from '../utils/constants';
import { isValidCoordinate } from '../utils/helpers';

/**
 * Converts a 2D grid matrix into an Adjacency List graph representation.
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @returns {Map<string, string[]>} Graph adjacency list (vertex -> array of neighbor vertices)
 */
export function buildGraphFromGrid(grid) {
  const graph = new Map();
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const vertexKey = `${r}-${c}`;
      const neighbors = [];
      const tile = grid[r][c];

      // If tile has an arrow direction, compute its directed outgoing edge
      if (tile && tile.arrow) {
        const vector = DIRECTION_VECTORS[tile.arrow];
        if (vector) {
          const nr = r + vector.r;
          const nc = c + vector.c;
          if (isValidCoordinate(nr, nc, rows, cols)) {
            neighbors.push(`${nr}-${nc}`);
          }
        }
      }

      graph.set(vertexKey, neighbors);
    }
  }

  return graph;
}

/**
 * Executes Breadth-First Search (BFS) to determine target reachability and shortest path.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @param {Object} startPos Starting coordinate { row: 0, col: 0 }
 * @param {Object} targetPos Target coordinate { row, col }
 * @returns {Object} { isReachable: boolean, path: Array<{row, col}>, pathSet: Set<string>, visitedCount: number, nodesExplored: string[] }
 */
export function solveBFS(
  grid,
  startPos = { row: 0, col: 0 },
  targetPos = { row: 4, col: 4 }
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const startKey = `${startPos.row}-${startPos.col}`;
  const targetKey = `${targetPos.row}-${targetPos.col}`;

  // 1. Build Adjacency List graph representation
  const graph = buildGraphFromGrid(grid);

  // 2. Initialize BFS data structures
  const queue = [startKey];
  const visited = new Set([startKey]);
  const parentMap = new Map(); // Tracks parent pointers for shortest path reconstruction
  const nodesExplored = [];

  let targetFound = false;

  // 3. BFS Traversal Loop (FIFO Queue)
  while (queue.length > 0) {
    const currentKey = queue.shift();
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
        queue.push(neighborKey);
      }
    }
  }

  // 4. Reconstruct shortest path if target was reached
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
