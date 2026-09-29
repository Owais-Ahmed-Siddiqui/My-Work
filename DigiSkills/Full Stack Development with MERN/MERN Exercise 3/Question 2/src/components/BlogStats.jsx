import React from 'react';

const BlogStats = ({ total, featuredCount }) => {
  return (
    <div className="blog-stats">
      <div className="stat-item">
        <span className="stat-label">Total Blogs:</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Featured:</span>
        <span className="stat-value">{featuredCount}</span>
      </div>
    </div>
  );
};

export default BlogStats;
