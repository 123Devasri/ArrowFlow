import React from 'react';
import { Zap, GitBranch, Award, Play } from 'lucide-react';
import '../css/AlgorithmCards.css';

/**
 * Dedicated Algorithms Mode Selection View Component for Arrow Flow.
 * Displays three clean selectable algorithm cards representing the DAA concept: BFS, DFS, and Dijkstra.
 */
export default function AlgorithmsPage({ onSelectAlgoMode }) {
  const cards = [
    {
      id: 'BFS',
      name: 'Breadth-First Search (BFS)',
      badge: 'Minimum Moves',
      badgeClass: 'badge-bfs',
      iconClass: 'card-icon-bfs',
      btnClass: 'btn-play-bfs',
      icon: <Zap size={22} />,
      goalLabel: 'Goal: Minimum Moves',
      purpose: 'Unweighted shortest path. Finds the path from Start to Goal requiring the fewest tile moves (edge = 1).',
    },
    {
      id: 'DFS',
      name: 'Perfect Route',
      badge: 'Min Cost & Moves',
      badgeClass: 'badge-dfs',
      iconClass: 'card-icon-dfs',
      btnClass: 'btn-play-dfs',
      icon: <GitBranch size={22} />,
      goalLabel: 'Goal: Min Cost & Moves',
      purpose: 'Calculates both minimum cost and minimum moves. Finds the optimal perfect route balancing path cost and step moves.',
    },
    {
      id: 'DIJKSTRA',
      name: "Dijkstra's Algorithm",
      badge: 'Minimum Cost',
      badgeClass: 'badge-dijkstra',
      iconClass: 'card-icon-dijkstra',
      btnClass: 'btn-play-dijkstra',
      icon: <Award size={22} />,
      goalLabel: 'Goal: Lowest Cost',
      purpose: 'Weighted path challenge. Finds the path with the minimum total cost across weighted tile entries (e.g. 1 to 10+).',
    },
  ];

  return (
    <div className="algo-cards-container">
      <div className="algo-section-header">
        <h2 className="algo-section-title">Choose Your Challenge</h2>
        <p className="algo-section-desc">
          Select an algorithm mode below to evaluate and play Arrow Flow under that DAA strategy.
        </p>
      </div>

      <div className="algo-cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="algo-card">
            <div className="algo-card-top">
              <div className="algo-card-header">
                <div className={`algo-card-icon ${card.iconClass}`}>
                  {card.icon}
                </div>
                <span className={`algo-mode-badge ${card.badgeClass}`}>
                  {card.badge}
                </span>
              </div>

              <h3 className="algo-card-name">{card.name}</h3>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'block' }}>
                {card.goalLabel}
              </span>
              <p className="algo-card-purpose">{card.purpose}</p>
            </div>

            <button
              className={`btn-card-play ${card.btnClass}`}
              onClick={() => onSelectAlgoMode && onSelectAlgoMode(card.id)}
            >
              <Play size={16} fill="currentColor" />
              <span>Start {card.id === 'DFS' ? 'Perfect Route' : card.id} Mode</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
