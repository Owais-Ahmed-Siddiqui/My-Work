import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, onDelete, onToggleFeatured }) => {
  if (blogs.length === 0) {
    return <p className="no-blogs">No blogs found matching your criteria.</p>;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
};

export default BlogList;
