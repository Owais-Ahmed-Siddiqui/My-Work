import React from 'react';

const BlogCard = React.memo(({ blog, onDelete, onToggleFeatured }) => {
  return (
    <div className={`blog-card ${blog.featured ? 'featured' : ''}`}>
      <div className="blog-card-content">
        <div className="blog-header">
          <span className="blog-category">{blog.category}</span>
          {blog.featured && <span className="featured-badge">★ Featured</span>}
        </div>
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-author">By {blog.author}</p>
        <p className="blog-reading-time">{blog.readingTime} min read</p>
      </div>
      <div className="blog-actions">
        <button 
          className="btn-toggle" 
          onClick={() => onToggleFeatured(blog.id)}
        >
          {blog.featured ? 'Unmark Featured' : 'Mark Featured'}
        </button>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(blog.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default BlogCard;
