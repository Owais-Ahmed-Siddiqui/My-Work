import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BlogList from './components/BlogList';
import BlogStats from './components/BlogStats';
import useFilteredBlogs from './hooks/useFilteredBlogs';
import './App.css';

const initialBlogs = [
  {
    id: 1,
    title: "Understanding React Hooks",
    category: "React",
    author: "Ali Khan",
    readingTime: 6,
    featured: true
  },
  {
    id: 2,
    title: "Redux Toolkit Basics",
    category: "Redux",
    author: "Sara Ahmed",
    readingTime: 8,
    featured: false
  },
  {
    id: 3,
    title: "Building Blog UI in React",
    category: "React",
    author: "Hamza Malik",
    readingTime: 5,
    featured: false
  },
  {
    id: 4,
    title: "Node.js and Express Introduction",
    category: "Node",
    author: "Ayesha Noor",
    readingTime: 7,
    featured: true
  }
];

function App() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // useRef for search input focus
  const searchInputRef = useRef(null);

  // Auto-focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Custom hook for filtering blogs (uses useMemo internally)
  const filteredBlogs = useFilteredBlogs(blogs, searchText, selectedCategory);

  // useCallback for delete action
  const handleDelete = useCallback((id) => {
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
  }, []);

  // useCallback for toggle featured status
  const handleToggleFeatured = useCallback((id) => {
    setBlogs((prevBlogs) => 
      prevBlogs.map(blog => 
        blog.id === id ? { ...blog, featured: !blog.featured } : blog
      )
    );
  }, []);

  // Memoized stats calculation
  const stats = useMemo(() => {
    return {
      total: blogs.length,
      featuredCount: blogs.filter(b => b.featured).length
    };
  }, [blogs]);

  return (
    <div className="container">
      <Header />
      
      <SearchBar 
        searchText={searchText} 
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        inputRef={searchInputRef}
      />
      
      <BlogStats 
        total={stats.total} 
        featuredCount={stats.featuredCount} 
      />
      
      <BlogList 
        blogs={filteredBlogs} 
        onDelete={handleDelete} 
        onToggleFeatured={handleToggleFeatured} 
      />
    </div>
  );
}

export default App;
