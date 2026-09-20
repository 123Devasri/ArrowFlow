import { DIRECTIONS, DIRECTION_VECTORS } from '../utils/constants';
import { isValidCoordinate } from '../utils/helpers';

const DIR_KEYS = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT];

/**
 * Calculates clockwise rotation moves needed to turn currentArrow into targetDir.
 */
function getRotationCost(currentArrow, targetDir) {
  if (!currentArrow || !targetDir) return 0;
  const currIdx = DIR_KEYS.indexOf(currentArrow);
  const targetIdx = DIR_KEYS.indexOf(targetDir);
  if (currIdx === -1 || targetIdx === -1) return 0;
  return (targetIdx - currIdx + 4) % 4;
}

/**
 * Builds a directed Adjacency List graph from current tile arrow directions.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @returns {Map<string, Array<{ key: string, row: number, col: number, cost: number }>>} Current graph
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

      if (tile && tile.arrow) {
        const vector = DIRECTION_VECTORS[tile.arrow];
        if (vector) {
          const nr = r + vector.r;
          const nc = c + vector.c;
          if (isValidCoordinate(nr, nc, rows, cols)) {
            const destTile = grid[nr]?.[nc];
            neighbors.push({
              key: `${nr}-${nc}`,
              row: nr,
              col: nc,
              cost: destTile?.cost || 1,
            });
          }
        }
      }

      graph.set(vertexKey, neighbors);
    }
  }

  return graph;
}

/**
 * Builds a full 4-directional grid graph where every tile connects to all valid orthogonal neighbors.
 * Calculates rotation moves required for source tile to point to each neighbor.
 * START tile arrow is locked to problem setup.
 * 
 * @param {Array<Array<Object>>} grid 2D matrix of tile objects
 * @returns {Map<string, Array<{ key: string, row: number, col: number, cost: number, rotations: number, moveWeight: number }>>} Full grid graph
 */
export function buildFullGridGraph(grid) {
  const graph = new Map();
  const rows = grid.length;
  const cols = grid[0].length;

  const offsets = [
    { r: -1, c: 0, dir: DIRECTIONS.UP },
    { r: 1, c: 0, dir: DIRECTIONS.DOWN },
    { r: 0, c: -1, dir: DIRECTIONS.LEFT },
    { r: 0, c: 1, dir: DIRECTIONS.RIGHT },
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const vertexKey = `${r}-${c}`;
      const neighbors = [];
      const currentTile = grid[r][c];

      for (const offset of offsets) {
        const nr = r + offset.r;
        const nc = c + offset.c;
        if (isValidCoordinate(nr, nc, rows, cols)) {
          const destTile = grid[nr]?.[nc];

          if (currentTile.isStart) {
            // START tile is locked: only permit neighbor matching START tile's fixed arrow direction
            if (currentTile.arrow === offset.dir) {
              neighbors.push({
                key: `${nr}-${nc}`,
                row: nr,
                col: nc,
                cost: destTile?.cost || 1,
                rotations: 0,
                moveWeight: 1, // 1 step + 0 rotations
              });
            }
          } else {
            const rotCost = getRotationCost(currentTile.arrow, offset.dir);
            neighbors.push({
              key: `${nr}-${nc}`,
              row: nr,
              col: nc,
              cost: destTile?.cost || 1,
              rotations: rotCost,
              moveWeight: 1 + rotCost, // 1 step + rotCost rotations
            });
          }
        }
      }

      graph.set(vertexKey, neighbors);
    }
  }

  return graph;
}
