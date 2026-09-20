# Arrow Flow — Graph Pathfinding Puzzle Game

**Arrow Flow** is an interactive, graph-theory-powered puzzle game built with React and Vite. Players rotate directional arrow tiles on a grid to construct an unbroken flow path from the **Start** tile to the **Goal** tile, optimizing for path cost, move count, or both.

---

## 🎯 Game Concept & Rules

- **Objective**: Direct the continuous arrow flow from the top-left **Start** tile `(0, 0)` to the bottom-right **Target / Goal** tile `(N-1, M-1)`.
- **Controls**: Click any regular arrow tile to rotate it **90° clockwise**.
- **Locked Tiles**: The **Start** tile's initial direction and the **Target** tile are locked to maintain puzzle integrity.
- **Move Calculation**:
  - Initial state starts at **0 moves**.
  - Rotating a tile increments the move counter by **1**.
  - Moving to the next tile in the flow path adds **1 move step**.
  - Rotation costs are calculated deterministically against the graph state.

---

## 🧮 Algorithms & Graph Solvers

Arrow Flow features three distinct Graph Solver modes operating on a directed state-space graph:

### 1. ⚡ BFS Mode (Minimum Moves)
- **Algorithm**: Breadth-First Search on a state-space graph $G = (V, E)$.
- **Graph Representation**: Each grid coordinate $(r, c)$ is expanded into 4 directional state nodes $(r, c, d)$ for $d \in \{\text{NORTH}, \text{EAST}, \text{SOUTH}, \text{WEST}\}$.
- **Move Weight**: Edge transitions carry a move weight of $1 + \text{rotationCost}$, where $\text{rotationCost} \in \{0, 1, 2, 3\}$ represents clockwise quarter-turns required.
- **Goal**: Guarantees finding the path requiring the absolute minimum total moves (rotations + step transitions).

### 2. ⭐ Perfect Route Mode
- **Algorithm**: Multi-Criteria Path Solver.
- **Goal**: Evaluates dual criteria (**minimum path cost** and **minimum total moves**) across all valid paths from Start to Goal to find the ultimate balanced optimal route.

### 3. 💎 Dijkstra Mode (Minimum Path Cost)
- **Algorithm**: Dijkstra's Shortest Path Algorithm with Priority Queue edge relaxation.
- **Goal**: Computes the path with the minimum accumulated cost across weighted tile entry values (ranging from 1 to 10+).

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tooling & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Pure CSS3 with CSS Variables, Flexbox, CSS Grid & Glassmorphism UI
- **Language**: JavaScript (ES6+ Modules)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/123Devasri/ArrowFlow.git
   cd arrowflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Launches Vite local development server with HMR. |
| **Build** | `npm run build` | Compiles optimized production bundle in `dist/`. |
| **Preview** | `npm run preview` | Serves the production build locally for verification. |

---

## 📁 Project Structure

```
arrowflow/
├── public/                # Static public assets
├── src/
│   ├── algorithms/        # Graph solvers & pathfinding algorithms
│   │   ├── graph.js       # Full grid state-space graph generator (r, c, d)
│   │   ├── bfs.js         # BFS solver (Minimum Moves)
│   │   ├── dfs.js         # Perfect Route dual-objective solver
│   │   ├── dijkstra.js    # Dijkstra solver (Minimum Path Cost)
│   │   └── pathfinding.js # Flow path traversal & cycle detector
│   ├── components/        # React UI components
│   │   ├── GameBoard.jsx  # Main game board & stats manager
│   │   ├── Header.jsx     # Unified top navigation bar
│   │   ├── Tile.jsx       # Interactive arrow tile component
│   │   ├── SettingsModal.jsx # Settings drawer modal
│   │   └── AlgorithmInfo.jsx # Developer algorithm inspector
│   ├── css/               # Modular CSS stylesheets
│   │   ├── App.css
│   │   ├── GameBoard.css
│   │   ├── Header.css
│   │   └── Tile.css
│   ├── utils/             # Helper utilities & constants
│   │   ├── boardGenerator.js # Solvable puzzle generator
│   │   ├── constants.js   # Game constants & difficulty configs
│   │   └── helpers.js     # Path cost & time formatters
│   ├── App.jsx            # Main App container
│   └── main.jsx           # React DOM entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
