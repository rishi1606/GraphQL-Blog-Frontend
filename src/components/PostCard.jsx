import React, { useState } from 'react';
import { Calendar, Trash2, ArrowRight } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../graphql/mutations.js';
import { GET_POSTS } from '../graphql/queries.js';
import DeleteConfirmModal from './DeleteConfirmModal.jsx';

const PostCard = ({ post, onSelectPost, onDeleteSuccess }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');

  const [deletePost, { loading: isDeleting }] = useMutation(DELETE_POST, {
    variables: { id: post.id },
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      setDeleteErrorMsg('');
      if (onDeleteSuccess) onDeleteSuccess();
    },
    onError: (err) => {
      setDeleteErrorMsg(err.message || 'Failed to delete blog post');
    },
  });

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteErrorMsg('');
    setIsDeleteModalOpen(true);
  };

  const formattedDate = new Date(parseInt(post.createdAt) || post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <div className="glass-card post-card" onClick={() => onSelectPost(post)} style={{ cursor: 'pointer' }}>
        <div className="card-image-wrapper">
          <img
            src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
            alt={post.title}
            className="card-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="card-tags">
            {post.tags && post.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="card-content">
          <div className="card-meta">
            <div className="card-author">
              <div className="author-avatar">
                {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
              </div>
              <span>{post.author || 'Anonymous'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>
          </div>

          <h3 className="card-title">{post.title}</h3>
          <p className="card-description">{post.description}</p>

          <div className="card-footer">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
              <span>Read Article</span>
              <ArrowRight size={15} />
            </span>

            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="btn-icon"
              style={{ color: '#ef4444' }}
              title="Delete Post"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteErrorMsg('');
        }}
        onConfirm={() => deletePost()}
        postTitle={post.title}
        isDeleting={isDeleting}
        errorMsg={deleteErrorMsg}
      />
    </>
  );
};

export default PostCard;
