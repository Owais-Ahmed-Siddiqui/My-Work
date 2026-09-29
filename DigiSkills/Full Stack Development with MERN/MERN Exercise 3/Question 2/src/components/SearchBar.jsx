import React from 'react';

const SearchBar = ({ searchText, setSearchText, selectedCategory, setSelectedCategory, inputRef }) => {
  return (
    <div className="search-bar-container">
      <div className="search-input-group">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search blogs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-filter-group">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="React">React</option>
          <option value="Redux">Redux</option>
          <option value="Node">Node</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
