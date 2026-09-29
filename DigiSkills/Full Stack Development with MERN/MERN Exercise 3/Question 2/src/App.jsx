import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BlogList from './components/BlogList';
import BlogStats from './components/BlogStats';
import useFilteredBlogs from './hooks/useFilteredBlogs';
import { 
  deleteBlog, 
  toggleFeatured, 
  setSearchText, 
  setCategory, 
  addBlog,
  loadBlogs,
  clearError
} from './redux/blogSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  // useSelector to read Redux state
  const { blogs, searchText, selectedCategory, loading, error } = useSelector((state) => state.blog);
  
  // Local state for Add Blog form
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    category: 'React',
    readingTime: '',
    featured: false
  });

  // useRef for search input focus
  const searchInputRef = useRef(null);

  // Auto-focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Custom hook for filtering blogs (uses useMemo internally)
  // Preserving Question 1 requirement: custom hook using useMemo
  const filteredBlogs = useFilteredBlogs(blogs, searchText, selectedCategory);

  // useCallback for actions passed to components
  // Preserving Question 1 requirement: useCallback
  const handleDelete = useCallback((id) => {
    dispatch(deleteBlog(id));
  }, [dispatch]);

  const handleToggleFeatured = useCallback((id) => {
    dispatch(toggleFeatured(id));
  }, [dispatch]);

  // Memoized stats calculation
  // Preserving Question 1 requirement: useMemo
  const stats = useMemo(() => {
    return {
      total: blogs.length,
      featuredCount: blogs.filter(b => b.featured).length
    };
  }, [blogs]);

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author || !newBlog.readingTime) return;
    
    dispatch(addBlog({
      ...newBlog,
      readingTime: parseInt(newBlog.readingTime)
    }));
    
    setNewBlog({
      title: '',
      author: '',
      category: 'React',
      readingTime: '',
      featured: false
    });
  };

  const handleSimulateFetch = (fail = false) => {
    dispatch(loadBlogs(fail));
  };

  return (
    <div className="container">
      <Header />
      
      {/* Async Demo Controls */}
      <div className="async-demo">
        <button onClick={() => handleSimulateFetch(false)} disabled={loading}>
          Simulate Fetch Success
        </button>
        <button onClick={() => handleSimulateFetch(true)} disabled={loading}>
          Simulate Fetch Error
        </button>
        {error && <button onClick={() => dispatch(clearError())} className="btn-clear">Clear Error</button>}
      </div>

      {/* Loading & Error UI */}
      {loading && <div className="loading-message">Loading blogs...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {/* Search Bar - demonstrated useDispatch */}
      <SearchBar 
        searchText={searchText} 
        setSearchText={(val) => dispatch(setSearchText(val))}
        selectedCategory={selectedCategory}
        setSelectedCategory={(val) => dispatch(setCategory(val))}
        inputRef={searchInputRef}
      />

      {/* Add Blog Form - demonstrated addBlog action */}
      <div className="add-blog-form">
        <h3>Add New Blog</h3>
        <form onSubmit={handleAddBlog}>
          <input 
            type="text" 
            placeholder="Title" 
            value={newBlog.title} 
            onChange={e => setNewBlog({...newBlog, title: e.target.value})}
            required
          />
          <input 
            type="text" 
            placeholder="Author" 
            value={newBlog.author} 
            onChange={e => setNewBlog({...newBlog, author: e.target.value})}
            required
          />
          <input 
            type="number" 
            placeholder="Reading Time (min)" 
            value={newBlog.readingTime} 
            onChange={e => setNewBlog({...newBlog, readingTime: e.target.value})}
            required
          />
          <select 
            value={newBlog.category} 
            onChange={e => setNewBlog({...newBlog, category: e.target.value})}
          >
            <option value="React">React</option>
            <option value="Redux">Redux</option>
            <option value="Node">Node</option>
          </select>
          <label>
            <input 
              type="checkbox" 
              checked={newBlog.featured} 
              onChange={e => setNewBlog({...newBlog, featured: e.target.checked})}
            />
            Featured
          </label>
          <button type="submit">Add Blog</button>
        </form>
      </div>
      
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
