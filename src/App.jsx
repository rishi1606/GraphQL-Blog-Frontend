import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from './graphql/queries.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PostCard from './components/PostCard.jsx';
import PostModal from './components/PostModal.jsx';
import CreatePostModal from './components/CreatePostModal.jsx';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Debounce search input by 350ms to prevent spamming GraphQL API requests on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Apply theme attribute to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const { data, loading, error, refetch } = useQuery(GET_POSTS, {
    variables: {
      search: debouncedSearchTerm.trim() !== '' ? debouncedSearchTerm : undefined,
      tag: selectedTag !== 'All' ? selectedTag : undefined,
    },
    fetchPolicy: 'cache-first',
  });

  // Extract all unique tags for filter buttons
  const availableTags = React.useMemo(() => {
    if (!data || !data.getPosts) return ['React', 'GraphQL', 'MongoDB', 'Architecture', 'Design', 'Vite'];
    const tagsSet = new Set();
    data.getPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((t) => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet).slice(0, 8);
  }, [data]);

  return (
    <div className="app-wrapper">
      {/* Ambient background animations */}
      <div className="ambient-background">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />
      </div>

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Hero
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        availableTags={availableTags}
      />

      <main className="container">
        {loading && !data && (
          <div className="status-container">
            <div className="spinner" />
            <p style={{ color: 'var(--text-muted)' }}>Connecting to GraphQL Server & Fetching Articles...</p>
          </div>
        )}

        {error && (
          <div className="status-container" style={{ padding: '3rem 2rem' }}>
            <AlertCircle size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Failed to Connect to GraphQL API</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '1.5rem' }}>
              {error.message || 'Please ensure the backend server is running on http://localhost:5000'}
            </p>
            <button onClick={() => refetch()} className="btn btn-primary">
              <RefreshCw size={16} />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {data && data.getPosts && data.getPosts.length === 0 && !loading && (
          <div className="status-container">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No articles found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              We couldn't find any blog posts matching your search criteria or tag filter.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {(searchTerm || selectedTag !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                    setSelectedTag('All');
                  }}
                  className="btn btn-secondary"
                >
                  Clear Filters
                </button>
              )}
              <button onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary">
                Write First Article
              </button>
            </div>
          </div>
        )}

        {data && data.getPosts && data.getPosts.length > 0 && (
          <div className="posts-grid">
            {data.getPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSelectPost={(p) => setSelectedPost(p)}
                onDeleteSuccess={() => refetch()}
              />
            ))}
          </div>
        )}
      </main>

      <footer style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
        <div className="container">
          <p>Full Stack Developer Assignment Demo • Built with React, Node.js, GraphQL & MongoDB</p>
          <p style={{ marginTop: '0.5rem' }}>Designed with rich glassmorphism aesthetics and responsive layouts.</p>
        </div>
      </footer>

      {/* Modals */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
