import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, UploadCloud, CheckCircle } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations.js';
import { GET_POSTS } from '../graphql/queries.js';

const CreatePostModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('React, GraphQL, FullStack');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      // Reset form
      setTitle('');
      setDescription('');
      setContent('');
      setAuthor('');
      setCoverImage('');
      setTagsInput('React, GraphQL, FullStack');
      setErrorMsg('');
      setIsDragging(false);
      if (onSuccess) onSuccess();
      onClose();
    },
    onError: (err) => {
      setErrorMsg(err.message || 'Failed to submit blog post');
    },
  });

  if (!isOpen) return null;

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result); // Converts file to Base64 data string
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !content.trim()) {
      setErrorMsg('Please fill in Title, Description, and Full Content.');
      return;
    }

    const formattedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');

    createPost({
      variables: {
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        author: author.trim() || 'Anonymous Dev',
        coverImage: coverImage.trim() || undefined,
        tags: formattedTags.length > 0 ? formattedTags : ['General'],
      },
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <PlusCircle size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Publish New Article</h3>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {errorMsg && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.75rem', color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input
              type="text"
              placeholder="e.g., Building Scalable Microservices with Node.js"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={120}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Short Description / Summary *</label>
            <input
              type="text"
              placeholder="A brief summary that appears on the homepage card preview"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={280}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                placeholder="Your Name (default: Anonymous Dev)"
                className="form-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="React, GraphQL, MongoDB"
                className="form-input"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Cover Image (Optional)</label>
            {!coverImage ? (
              <label
                className={`image-upload-dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <UploadCloud size={36} style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }} />
                <span style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                  Click to browse or drag & drop image
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Supports PNG, JPG, WEBP, GIF (max 5MB)
                </span>
              </label>
            ) : (
              <div className="image-preview-container">
                <img src={coverImage} alt="Cover Preview" className="image-preview-thumb" />
                <div className="image-preview-overlay">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>
                    <CheckCircle size={16} /> Image Ready
                  </span>
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    className="btn btn-danger"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Full Blog Content *</label>
            <textarea
              placeholder="Write your article content here... (Supports multiple paragraphs and formatting)"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              <Sparkles size={16} />
              <span>{loading ? 'Publishing...' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
