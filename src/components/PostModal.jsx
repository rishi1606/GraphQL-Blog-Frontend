import React from 'react';
import { X, Calendar, User, Tag } from 'lucide-react';

const PostModal = ({ post, onClose }) => {
  if (!post) return null;

  const formattedDate = new Date(parseInt(post.createdAt) || post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span className="tag-pill" style={{ background: 'var(--accent-primary)', color: 'white' }}>
              Article
            </span>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          <img
            src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
            alt={post.title}
            className="post-detail-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
            }}
          />

          <h2 style={{ fontSize: '2rem', lineHeight: '1.25', marginBottom: '1rem', color: 'var(--text-main)' }}>
            {post.title}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>By <strong style={{ color: 'var(--text-main)' }}>{post.author || 'Anonymous Dev'}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>Published on {formattedDate}</span>
            </div>
          </div>

          <div className="post-detail-content">
            {post.content}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Tag size={16} style={{ color: 'var(--text-dim)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginRight: '0.5rem' }}>Tags:</span>
              {post.tags.map((t, idx) => (
                <span key={idx} className="tag-pill" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
