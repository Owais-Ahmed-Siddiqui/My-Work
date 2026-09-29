import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

// Async thunk to simulate fetching blogs
export const loadBlogs = createAsyncThunk(
  'blog/loadBlogs',
  async (shouldFail = false, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Failed to load blogs from server."));
        } else {
          resolve(initialBlogs);
        }
      }, 1500);
    });
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: initialBlogs,
    searchText: "",
    selectedCategory: "All",
    loading: false,
    error: null
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push({
        ...action.payload,
        id: Date.now()
      });
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
    },
    toggleFeatured: (state, action) => {
      const blog = state.blogs.find(blog => blog.id === action.payload);
      if (blog) {
        blog.featured = !blog.featured;
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(loadBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  }
});

export const { 
  addBlog, 
  deleteBlog, 
  toggleFeatured, 
  setSearchText, 
  setCategory,
  clearError
} = blogSlice.actions;

export default blogSlice.reducer;
