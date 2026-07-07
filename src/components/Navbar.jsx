import React from 'react';
import { Search, Plus, Sun, Moon, Terminal } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm, onOpenCreateModal, theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-header">
          <a href="/" className="brand-logo">
            <div className="brand-icon-wrapper">
              <Terminal size={22} />
            </div>
            <span>Dev<span className="gradient-text">Chronicles</span></span>
          </a>

          <button
            onClick={toggleTheme}
            className="btn-icon mobile-theme-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="nav-actions">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search articles, tags..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button onClick={onOpenCreateModal} className="btn btn-primary create-post-btn">
            <Plus size={18} />
            <span className="btn-text">Create Post</span>
          </button>

          <button
            onClick={toggleTheme}
            className="btn-icon desktop-theme-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
