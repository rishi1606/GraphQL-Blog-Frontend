import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, postTitle, isDeleting, errorMsg }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="modal-content delete-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="btn-icon"
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem 0.5rem' }}>
          <div className="delete-icon-wrapper">
            <AlertTriangle size={32} style={{ color: '#ef4444' }} />
          </div>

          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.75rem', marginTop: '1rem' }}>
            Delete Blog Post?
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '340px' }}>
            Are you sure you want to delete <strong style={{ color: 'var(--text-main)' }}>"{postTitle}"</strong>? This action is permanent and cannot be undone.
          </p>

          {errorMsg && (
            <div style={{ width: '100%', padding: '0.65rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.65rem', color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="btn btn-secondary"
              style={{ flex: 1 }}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onConfirm(); }}
              className="btn btn-danger"
              style={{ flex: 1 }}
              disabled={isDeleting}
            >
              <Trash2 size={16} />
              <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
