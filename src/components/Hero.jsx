import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero = ({ selectedTag, setSelectedTag, availableTags }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Full Stack GraphQL Assignment Demo</span>
        </div>
        
        <h1 className="hero-title">
          Explore the Frontiers of <span className="gradient-text">Modern Web Engineering</span>
        </h1>
        
        <p className="hero-subtitle">
          Discover curated tutorials, architectural patterns, and full-stack coding insights powered by React, Node.js, GraphQL, and MongoDB.
        </p>

        <div className="tag-filters">
          <button
            className={`tag-btn ${selectedTag === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedTag('All')}
          >
            All Topics
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
