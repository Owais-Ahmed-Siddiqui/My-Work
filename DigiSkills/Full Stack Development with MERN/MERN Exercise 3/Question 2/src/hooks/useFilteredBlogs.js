import { useMemo } from 'react';

/**
 * Custom hook to filter blogs based on search text and category.
 * @param {Array} blogs - The list of blog objects.
 * @param {string} searchText - The text to search for in titles, authors, and categories.
 * @param {string} selectedCategory - The category to filter by ('All', 'React', etc.).
 * @returns {Array} - The memoized filtered list of blogs.
 */
const useFilteredBlogs = (blogs, searchText, selectedCategory) => {
  return useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchText, selectedCategory]);
};

export default useFilteredBlogs;
