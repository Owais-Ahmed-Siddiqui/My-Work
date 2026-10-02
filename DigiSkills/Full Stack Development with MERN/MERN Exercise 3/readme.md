# Hands-on Exercise 03

In this exercise, I built a small React Blog Dashboard using React and Redux Toolkit.

### Question 1

I created reusable React components such as Header, SearchBar, BlogCard, BlogList, and BlogStats. I displayed the blog data using `map()` and added search and category filtering using a custom `useFilteredBlogs` hook and `useMemo`.

I also used `useRef` to focus the search box, `useCallback` for button functions, and `React.memo` for the BlogCard component. I added CSS to make the dashboard clean and responsive.

### Question 2

I added Redux Toolkit to manage the blog dashboard state. I created a Redux store and blog slice for blogs, search text, category, loading, and error states.

I added actions for adding, deleting, and updating blogs and used `useSelector` and `useDispatch` to connect Redux with the React components. I also added an async loading example with loading and error messages.

## Tools Used

* React
* Vite
* JavaScript
* Redux Toolkit
* React Redux
* CSS
* VS Code
